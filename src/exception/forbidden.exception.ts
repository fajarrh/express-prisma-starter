import { ErrorCode } from "@constant/error-code.constant";

export default class ForbiddenException extends Error {
  respCode = ErrorCode.FORBIDDEN;
  status = 403;

  constructor(error: any = "") {
    super(JSON.stringify(error));
  }
}
