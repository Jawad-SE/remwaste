import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(`Error in ${req.method} ${req.originalUrl}: ${err.stack || err.message}`);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
};
