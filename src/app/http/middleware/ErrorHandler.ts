import { ErrorRequestHandler } from "express-serve-static-core";
import { MulterError } from "multer";
import { ValidationError } from "yup";
import AuthorizationException from "@exception/AuthorizationException";
import UnprocessableException from "@exception/UnprocessableException";
import NotFoundException from "@exception/NotFoundException";
import { Prisma } from "@prisma/client";

const ErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let message = "";
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof AuthorizationException) {
    return res.status(401).json({ error: err?.message });
  }

  if (err instanceof UnprocessableException) {
    return res.status(422).json({ error: JSON.parse(err?.message) });
  }

  if (err instanceof NotFoundException) {
    return res.status(404).json({ error: err?.message });
  }

  if (err instanceof ValidationError) {
    return res.status(422).json({
      error: err.inner.map((v) => ({
        label: v.params?.label,
        path: v.path,
        type: v.type,
      })),
    });
  }

  if (err instanceof MulterError) {
    return res.status(422).json({ error: err.message });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2000":
        message = "Value is too long for this field.";
        break;
      case "P2001":
        message = "Record not found.";
        break;
      case "P2002":
        message = "Unique constraint failed.";
        break;
      case "P2003":
        message = "Foreign key constraint failed.";
        break;
      case "P2004":
        message = "Constraint failed on the database.";
        break;
      case "P2005":
        message = "Invalid value for field.";
        break;
      case "P2006":
        message = "Provided value is not valid for field.";
        break;
      case "P2007":
        message = "Data validation error.";
        break;
      case "P2008":
        message = "Failed to parse query.";
        break;
      case "P2009":
        message = "Query validation failed.";
        break;
      case "P2010":
        message = "Raw query execution failed.";
        break;
      case "P2011":
        message = "Null constraint violation.";
        break;
      case "P2012":
        message = "Missing required value for a field.";
        break;
      case "P2013":
        message = "Missing argument for a required field.";
        break;
      case "P2014":
        message = "Multiple relations violation.";
        break;
      case "P2015":
        message = "Record for the ID not found.";
        break;
      case "P2016":
        message = "Query is not valid.";
        break;
      case "P2017":
        message = "Database constraint error.";
        break;
      case "P2018":
        message = "Required relation not found.";
        break;
      case "P2019":
        message = "Input data is invalid.";
        break;
      case "P2025":
        message = "Record was not found.";
        break;
      default:
        message = err.message;
        break;
    }

    return res.status(400).json({ code: err.code, error: message });
  }

  return res.status(500).json({
    error: err?.message,
  });
};

export default ErrorHandler;
