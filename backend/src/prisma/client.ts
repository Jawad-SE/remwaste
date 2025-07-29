import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

prisma
  .$connect()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err: unknown) => {
    console.error("Prisma connection error:", err);
    process.exit(1);
  });
