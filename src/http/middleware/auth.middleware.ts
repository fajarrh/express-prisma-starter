import RedisUtils from "@utils/redis.utils";
import jwt from "jsonwebtoken";
import { redisSession } from "@config/redis";
import { RequestHandler } from "express";
import { ENV } from "@config/env";

const AuthMiddleware: RequestHandler = async (req, res, next) => {
  try {
    const authorization = req.header("authorization");

    if (!authorization || !authorization.includes("Bearer")) {
      throw new Error("Unauthorization");
    }

    const [, token] = authorization.split(" ");
    const decoded: any = await new Promise((resolve, reject) => {
      jwt.verify(token, ENV.APP.JWT_SECRET, (err, decoded) => {
        if (err) return reject(err);
        resolve(decoded);
      });
    });

    const session = await RedisUtils.init(redisSession).getSession(String(decoded.id));
    if (!session || session.uuid !== decoded.uuid) {
      throw new Error("Unauthorization");
    }

    req.user = session;
    next();
  } catch (error: any) {
    res.status(401).json({ error: error?.message });
  }
};

export default AuthMiddleware;
