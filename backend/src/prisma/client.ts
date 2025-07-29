// src/config/prisma.ts
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

// Optionally connect at startup for a log:
prisma.$connect()
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.error('Prisma connection error:', err);
    process.exit(1); // Exit if you never want to run without DB
  });
