import dotenv from "dotenv";
dotenv.config({ path: [`.env.${process.env.NODE_ENV}`, ".env"] });
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import corsOptions from "@config/cors";
import logs from "@config/log";
import { registerRoutes } from "frexp/lib/Decorator";
import RequestMiddleware from "@middleware/RequestMiddleware";
import errorHandler from "@middleware/errorHandler";
import redis from "@config/redis";
import * as router from "./router";
import prisma from "@config/db";

const app = express();
app.use(logs);
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use("/public", express.static(__dirname + "/storage"));
app.use(RequestMiddleware);
registerRoutes(app, router, errorHandler);

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  redis.disconnect();
  console.log("Prisma & Redis disconnected");
  process.exit(0);
});

app.listen(process.env.PORT, () => {
  const msg = `server has running in port :${process.env.PORT} on ${process.env.NODE_ENV} mode.`;
  console.log(msg);

  redis.on("ready", () => {
    console.log("redis is ready");
  });

  redis.on("connect", () => {
    console.log("redis is connect");
  });

  redis.on("error", (err) => {
    console.log("redis error", err.message);
  });
});
