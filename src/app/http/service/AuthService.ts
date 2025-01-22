import RedisUtils from "@lib/RedisUtils";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";

export const login = async () => {
  const jwtPayload = {
    id: 1,
    uuid: v4(),
  };

  const token = jwt.sign(jwtPayload, process.env.JWT_SECRET as string);
  await RedisUtils.setSession(0, String(jwtPayload.id), jwtPayload);
  return token;
};
