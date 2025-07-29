import { AuthRequest } from './auth';
import { Response, NextFunction } from 'express';

export const requireRole = (role: string) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== role) return res.sendStatus(403);
    next();
  };
};
