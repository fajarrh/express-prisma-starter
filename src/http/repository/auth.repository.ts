import prisma from "@config/db";
import AuthorizationException from "@exception/authorization.exception";
import { Prisma } from "@generated/prisma/client";

export const getUserAuth = async (email: string) => {
  const user = await prisma.user.findFirst({
    select: { id: true, name: true, email: true, password: true },
    where: { email: email },
  });

  if (!user) throw new AuthorizationException();

  return user;
};

export const createUserAuth = (data: Prisma.UserUncheckedCreateInput) => {
  return prisma.user.create({ data });
};
