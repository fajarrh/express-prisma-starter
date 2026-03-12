import { ErrorCode } from "@constant/error-code.constant";

export default class BadRequestException extends Error {
  respCode = ErrorCode.BAD_REQUEST;
  status = 400;

  constructor(error: any = "") {
    super(JSON.stringify(error));
  }
}
