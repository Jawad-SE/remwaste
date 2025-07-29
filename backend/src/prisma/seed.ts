import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Admin
  await prisma.user.upsert({
    where: { email: "jane@doe.com" },
    update: {},
    create: {
      email: "jane@doe.com",
      password: await bcrypt.hash("Rating123@", 10),
      role: "admin",
      firstName: "Jane",
      lastName: "Doe",
    },
  });

  // Test User
  await prisma.user.upsert({
    where: { email: "testuser@example.com" },
    update: {},
    create: {
      email: "testuser@example.com",
      password: await bcrypt.hash("testpass123", 10),
      role: "user",
      firstName: "Test",
      lastName: "User",
    },
  });

  console.log("Seeded admin user: jane@doe.com");
  console.log("Seeded test user: testuser@example.com");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
