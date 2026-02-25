import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import { registerRoutes } from "frexp/lib/Decorator";

import { ENV } from "@config/env";
import { appLog } from "@config/log";
import { redisSession } from "@config/redis";
import prisma from "@config/db";

import RequestMiddleware from "@middleware/request.middleware";
import ErrorHandler from "@middleware/error.handler";

import * as router from "./router";

const app = express();
app.use(appLog);
app.use(
  cors({
    origin: ENV.CORS.ORIGIN,
    credentials: ENV.CORS.CREDENTIALS,
    methods: ENV.CORS.METHODS,
    allowedHeaders: ENV.CORS.HEADERS,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(RequestMiddleware);
registerRoutes(app, router, ErrorHandler);

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  redisSession.disconnect();
  console.log("Prisma & Redis disconnected");
  process.exit(0);
});

app.listen(ENV.APP.PORT, () => {
  const msg = `server has running in port :${ENV.APP.PORT} on ${ENV.APP.ENV} mode.`;
  console.log(msg);

  redisSession.on("ready", () => {
    console.log("redis session is ready");
  });

  redisSession.on("connect", () => {
    console.log("redis session is connect");
  });

  redisSession.on("error", (err) => {
    console.log("redis session error", err.message);
  });
});
