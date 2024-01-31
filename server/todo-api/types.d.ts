import { Request } from "express";

export interface HTTPError extends Error {
  status?: number;
  errors?: Array<{ message: string }>;
}

export interface JWTPayload {
  sub: string;
  name: string;
  meta: {
    r: Array<string>;
    scid: string;
  };
  iat: number;
  exp: number;
}

export interface AuthenticatedRequest extends Request {
  createdBy: string;
}