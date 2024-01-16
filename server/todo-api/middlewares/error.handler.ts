import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../types';
import l from '../../common/logger';

export default function errorHandler(
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const errors = err.errors || [{ message: err.message }];
  res.status(err.status || 500).json({ errors });
  l.error({ errors }) 
}
