import prisma from "@config/db";
import AuthorizationException from "@exception/authorization.exception";
import RedisUtils from "@lib/redis.utils";
import StringUtils from "@lib/string.utils";
import { LoginSchema, RegisterSchema } from "@validation/auth.validation";
import { v4 } from "uuid";
import jwt from "jsonwebtoken";

export const login = async (payload: LoginSchema) => {
  const user = await prisma.user.findFirstOrThrow({
    select: { id: true, name: true, email: true, password: true },
    where: { email: payload.email },
  });

  const { id, password, ...other } = user;
  const passVerify = await StringUtils.verifyPassword(
    payload.password,
    password
  );
  if (!passVerify) {
    throw new AuthorizationException();
  }

  const jwtPayload = {
    id: id,
    uuid: v4(),
  };

  const token = jwt.sign(jwtPayload, process.env.JWT_SECRET as string);
  await RedisUtils.setSession(0, String(id), jwtPayload);
  return {
    token: token,
    user: other,
  };
};

export const handleRegister = async (payload: RegisterSchema) => {
  payload.password = await StringUtils.hashPassword(payload.password);
  return prisma.user.create({ data: payload });
};
