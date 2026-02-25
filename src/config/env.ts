import dotenv from "dotenv";
import fs from "fs";
import path from "path";

const resolvedEnv = process.env.NODE_ENV || "dev";
const envPath = path.resolve(process.cwd(), `.env.${resolvedEnv}`);

if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  dotenv.config();
}

export const ENV = {
  APP: {
    ENV: resolvedEnv ?? "dev",
    PORT: Number(process.env.PORT) ?? 3000,
    URL: process.env.APP_URL ?? "http://localhost:3000",
    JWT_SECRET: process.env.JWT_SECRET ?? "your_jwt_secret",
  },
  DB: {
    HOST: process.env.DB_HOST ?? "localhost",
    PORT: Number(process.env.DB_PORT) ?? 5432,
    USER: process.env.DB_USER ?? "postgres",
    PASS: process.env.DB_PASSWORD ?? "password",
    NAME: process.env.DB_NAME ?? "postgres",
    SCHEMA: process.env.DB_SCHEMA ?? "public",
    get URL() {
      return `postgresql://${this.USER}:${this.PASS}@${this.HOST}:${this.PORT}/${this.NAME}?schema=${this.SCHEMA}`;
    },
  },
  REDIS: {
    HOST: process.env.REDIS_HOST ?? "localhost",
    PORT: Number(process.env.REDIS_PORT) ?? 6379,
    PASSWORD: process.env.REDIS_PASSWORD ?? ""  ,
  },
  CORS: {
    ORIGIN: process.env.CORS_ORIGIN,
    CREDENTIALS: process.env.CORS_CREDENTIALS === "true",
    METHODS: process.env.CORS_ALLOW_METHODS,
    HEADERS: process.env.CORS_ALLOW_HEADERS,
  },
} as const;
