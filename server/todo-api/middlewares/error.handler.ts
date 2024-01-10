import { Request, Response, NextFunction } from 'express';
interface CustomError extends Error {
  status?: number;
  errors?: { message: string }[];
}
export default function errorHandler(
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const errors = err.errors || [{ message: err.message }];
  res.status(err.status || 500).json({ errors });
}
