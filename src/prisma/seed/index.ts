import { PrismaClient } from "@prisma/client";
import userSeed from "./userSeed";

const prisma = new PrismaClient();

const main = async () => {
  await userSeed();
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
