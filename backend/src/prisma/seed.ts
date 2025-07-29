import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      password: await bcrypt.hash("adminpass", 10),
      firstName: "Admin",
      lastName: "User",
      role: "admin",
    },
  });

  await prisma.user.upsert({
    where: { email: "testuser@example.com" },
    update: {},
    create: {
      email: "testuser@example.com",
      password: await bcrypt.hash("testpass123", 10),
      firstName: "Test",
      lastName: "User",
      role: "user",
    },
  });
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
