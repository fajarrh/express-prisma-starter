import { RequestHandler } from "express";
import Validation from "frexp/lib/Validation";
import { v4 } from "uuid";

const RequestMiddleware: RequestHandler = (req, res, next) => {
  const date = new Date();
  req.id = req.header("X-Request-ID") ?? v4();
  res.setHeader("X-Request-ID", req.id);

  if (req.header("TZ")) {
    date.setUTCHours(date.getUTCHours() + Number(req.header("TZ")));
  }

  Object.assign(req, {
    getQuery: (key: string, defaulValue?: any) => {
      return req.query[key] ?? defaulValue ?? null;
    },
    validation: Validation.body(req.body),
    now: () => date,
  });
  next();
};

export default RequestMiddleware;
