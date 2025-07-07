import { PrismaClient } from "@generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const userSeed = async () => {
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
      })
    )
  );
}

export default userSeed;
