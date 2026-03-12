import { ErrorCode } from "@constant/error-code.constant";

export default class UnprocessableException extends Error {
  respCode = ErrorCode.UNPROCESSABLE;
  status = 422;
  
  constructor(error: any = "") {
    super(JSON.stringify(error));
  }
}
