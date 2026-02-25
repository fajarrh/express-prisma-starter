import prisma from "@config/db";
import AuthorizationException from "@exception/authorization.exception";
import RedisUtils from "@utils/redis.utils";
import jwt from "jsonwebtoken";
import { LoginSchema, RegisterSchema } from "@validation/auth.validation";
import { v4 } from "uuid";
import { redisSession } from "@config/redis";
import { hashPassword, verifyPassword } from "@utils/password.utils";
import { ENV } from "@config/env";

export const handleLogin = async (payload: LoginSchema) => {
  const user = await prisma.user.findFirst({
    select: { id: true, name: true, email: true, password: true },
    where: { email: payload.email },
  });

  if (!user) throw new AuthorizationException();

  const { id, password, ...other } = user;
  const passVerify = await verifyPassword(
    payload.password,
    password,
  );

  if (!passVerify) throw new AuthorizationException();

  const jwtPayload = {
    id: id,
    uuid: v4(),
  };

  const token = jwt.sign(jwtPayload, ENV.APP.JWT_SECRET);
  await RedisUtils.init(redisSession).setSession(String(id), jwtPayload);
  return {
    token: token,
    user: other,
  };
};

export const handleRegister = async (payload: RegisterSchema) => {
  payload.password = await hashPassword(payload.password);
  return prisma.user.create({ data: payload });
};
