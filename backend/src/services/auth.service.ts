import { prisma } from '../prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (data: {email: string, password: string, firstName: string, lastName: string, role: string}) => {
  const hashed = await bcrypt.hash(data.password, 10);
  return prisma.user.create({
    data: { ...data, password: hashed }
  });
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return null;
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '7d' });
  return { user, token };
};

export const getUserProfile = async (userId: string) => {
  return prisma.user.findUnique({ where: { id: userId }, select: { id: true, email: true, firstName: true, lastName: true, role: true } });
};
