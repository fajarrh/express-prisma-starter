import Redis from "ioredis";

const redis = new Redis(
  Number(process.env.REDIS_PORT || 6379),
  process.env.REDIS_HOST || "127.0.0.1"
);

const redisClient = redis.duplicate();

export { redis, redisClient };
