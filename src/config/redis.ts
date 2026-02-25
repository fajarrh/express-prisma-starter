import { REDIS_DB } from "@constant/redis.constant";
import Redis from "ioredis";
import { ENV } from "./env";

const redisConfig = {
  host: ENV.REDIS.HOST,
  port: Number(ENV.REDIS.PORT),
  password: ENV.REDIS.PASSWORD,
};

export const redisSession = new Redis({ ...redisConfig, db: REDIS_DB.SESSION });
export const redisQueue = new Redis({ ...redisConfig, db: REDIS_DB.QUEUE });
