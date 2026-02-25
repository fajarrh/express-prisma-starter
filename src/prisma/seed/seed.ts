import { PrismaClient } from "@generated/prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient({} as any);

const main = async () => {
  const hashedPassword = await bcrypt.hash("123456", 10);

  const users = [
    {
      email: "admin@email.com",
      name: "admin",
      password: hashedPassword,
      phoneNumber: "000000000000",
    },
  ];

  await Promise.all(
    users.map((user) =>
      prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: user,
      }),
    ),
  );
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
