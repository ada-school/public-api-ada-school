import { NextFunction, Response, Request } from 'express';
import { SECRET_KEY } from '../../config';
import jwt from 'jsonwebtoken';
import { HTTPError } from '../../HTTPError';

interface JWTPayload {
  sub: string;
  name: string;
  meta: {
    r: Array<string>;
    scid: string;
  };
  iat: number;
  exp: number;
}

let authError: HTTPError = {
  name: 'Unauthorized',
  status: 401,
  message: '',
};

const existAuthorization = (
  authorization: string | undefined
): authorization is string => {
  return authorization !== undefined;
};
const authJWT = (req: Request, res: Response, next: NextFunction): void => {
  const authorization = req.headers.authorization;

  if (!existAuthorization(authorization)) {
    authError = {
      ...authError,
      message: 'there is not authorization header provided',
    };

    return next(authError);
  }

  const token = authorization.split(' ')[1];
  if (!token) {
    authError = {
      ...authError,
      message: 'No token is provided',
    };
    return next(authError);
  }

  jwt.verify(token, SECRET_KEY, (error, decoded) => {
    if (error) {
      authError = {
        ...authError,
        message: error.message,
      };

      return next(authError);
    }

    const decodedToken = decoded as JWTPayload;

    const user = {
      id: decodedToken.meta.scid,
    };
    res.locals.user = user;
    next();
  });
};

export default authJWT;
