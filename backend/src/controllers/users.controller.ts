import { Request, Response } from 'express';
import { getAllUsersService, getUserByIdService } from '../services/users.service';

export const getAllUsers = async (_: Request, res: Response) => {
  const users = await getAllUsersService();
  res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const user = await getUserByIdService(req.params.id);
  if (!user) return res.status(404).json({ error: 'Not found' });
  res.json(user);
};
