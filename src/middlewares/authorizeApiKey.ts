/**
 * @license
 * Copyright 2024 Ada School
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

import { Handler } from "express";
import asyncHandler from "express-async-handler";
import { HTTPError } from "../HTTPError";
import { config } from "../config";

const authorizeHandler: Handler = (req, _res, next) => {
  const apiKey = req.headers.authorization
    ? req.headers.authorization?.split("Bearer ")?.[1]
    : "";

  if (!apiKey) {
    throw new HTTPError({ status: 401, message: "Unauthorized" });
  }

  if (apiKey !== config.CRON_JOB_API_KEY) {
    throw new HTTPError({ status: 401, message: "Unauthorized" });
  }

  return next();
};

export const authorizeAPIKey = asyncHandler(authorizeHandler);
