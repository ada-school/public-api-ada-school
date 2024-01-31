import { Request, Response, NextFunction } from 'express';
import { HTTPError } from '../HTTPError';
import log from './logger';

export default function errorHandler(
  err: HTTPError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const errors = err.errors || [{ message: err.message }];
  res.status(err.status || 500).json({ errors });
  log.error({ errors });
}
