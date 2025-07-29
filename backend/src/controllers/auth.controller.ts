import { Request, Response } from 'express';
import { registerUser, loginUser, getUserProfile } from '../services/auth.service';

export const register = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ id: user.id, email: user.email });
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await loginUser(email, password);
  if (!result) return res.status(401).json({ error: 'Invalid credentials' });
  
  // Remove password before sending user object
  const { password: _pw, ...userWithoutPassword } = result.user;
  res.json({
    token: result.token,
    user: userWithoutPassword,
  });
};

export const me = async (req: Request, res: Response) => {
  const user = await getUserProfile((req as any).user.id);
  if (!user) return res.status(404).json({ error: 'Not found' });
  res.json(user);
};
