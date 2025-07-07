import { RequestHandler } from "express";
import Validation from "frexp/lib/Validation";
import { v4 } from "uuid";

const RequestMiddleware: RequestHandler = (req, res, next) => {
  const date = new Date();
  req.id = req.header("X-Request-ID") ?? v4();
  res.setHeader("X-Request-ID", req.id);

  if (req.query.page !== undefined && req.query.perPage !== undefined) {
    req.query.skip = String(+req.query.page * +req.query.perPage);
    req.query.take = req.query.perPage;
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
