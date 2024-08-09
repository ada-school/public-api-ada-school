/**
 * @license
 * Copyright 2024 Ada School
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { LRUCache } from "lru-cache";
import { AsyncHandler } from "../AsyncHandler";
import { HTTPError } from "../HTTPError";
import { checkStudentAPIToken } from "../LXPClient";
import { config } from "../config";
import { compactDecrypt, KeyLike, importPKCS8 } from "jose";

const isDev = config.NODE_ENV === "development";

interface AdaJWT {
  sub: string;
  name: string;
  meta: {
    r: ReadonlyArray<string>;
    scid: string;
  };
}

interface AdaJWTData {
  userId: string;
  userRoles: ReadonlyArray<string>;
  schoolId: string;
}

const isAdaJWT = (value: unknown): value is AdaJWT =>
  value !== undefined &&
  !!(value as AdaJWT).sub &&
  !!(value as AdaJWT).name &&
  !!(value as AdaJWT).meta &&
  !!(value as AdaJWT).meta.r &&
  !!(value as AdaJWT).meta.scid;

const tokenCache = new LRUCache<string, AdaJWTData>({
  max: 9000,
  ttl: 1000 * 60 * 60 * 5,
});

let privateKey: KeyLike;

importPKCS8(config.JWE_PRIVATE_KEY, "RS256")
  .then((key) => {
    privateKey = key;
  })
  .catch((error) => {
    throw new HTTPError({
      code: 500,
      errors: error,
      message: "authorize: failed importPKCS8",
    });
  });

export const decryptJwe = async (jwe: string): Promise<string> => {
  try {
    const { plaintext } = await compactDecrypt(jwe, privateKey);
    const jwt = JSON.parse(new TextDecoder().decode(plaintext));

    return jwt;
  } catch (error) {
    throw new HTTPError({
      code: 500,
      errors: error,
      message: "authorize: failed decryptJWE",
    });
  }
};

const parseJWT = async (token: string) => {
  return new Promise<AdaJWTData>((resolve, reject) => {
    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return reject(
            new HTTPError({ status: 401, message: "Token Expired", code: 4 })
          );
        }

        return reject(
          new HTTPError({ status: 401, message: "Unauthorized", code: 5 })
        );
      }

      if (isAdaJWT(decoded)) {
        const tokenData: AdaJWTData = {
          userId: decoded.sub,
          userRoles: decoded.meta.r,
          schoolId: decoded.meta.scid,
        };

        tokenCache.set(token, tokenData);

        return resolve(tokenData);
      } else {
        reject(
          new HTTPError({
            status: 401,
            message: "Unauthorized",
            code: 3,
          })
        );
      }
    });
  });
};

const authorizeHandler: AsyncHandler = async (req, _res, next) => {
  const studentApiKey = req.headers.authorization
    ? req.headers.authorization?.split("Bearer ")?.[1]
    : "";

  if (!studentApiKey) {
    throw new HTTPError({ status: 401, message: "Unauthorized", code: 1 });
  }

  const jwt = await decryptJwe(studentApiKey);

  // Check if the token is in the token cache
  if (tokenCache.has(jwt)) {
    req.jwt = tokenCache.get(jwt);

    return next();
  }

  // If not running in development, check the token with the LXP API
  if (!isDev) {
    const isTokenValid = await checkStudentAPIToken(jwt);

    if (!isTokenValid) {
      throw new HTTPError({ status: 401, message: "Unauthorized", code: 2 });
    }
  }

  const jwtData = await parseJWT(jwt);

  req.jwt = jwtData;

  return next();
};

export const authorize = asyncHandler(authorizeHandler);
