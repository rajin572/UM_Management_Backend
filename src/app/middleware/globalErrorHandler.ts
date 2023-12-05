/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = 400;
  const message = err.message || 'Something Want Wrong';

  return res.status(statusCode).json({
    status: false,
    message,
    error: err,
  });
};

export default globalErrorHandler;
