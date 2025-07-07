import RedisUtils from "@lib/redis.utils";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

const AuthMiddleware: RequestHandler = async (req, res, next) => {
  try {
    const authorization = req.header("authorization");

    if (!authorization || !authorization.includes("Bearer")) {
      throw new Error("Unauthorization");
    }

    const [, token] = authorization.split(" ");
    const decoded: any = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
        if (err) return reject(err);
        resolve(decoded);
      });
    });

    const session = await RedisUtils.getSession(0, decoded.id);
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
