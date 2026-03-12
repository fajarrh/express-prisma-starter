import { ErrorCode } from "@constant/error-code.constant";

export default class AuthorizationException extends Error {
  respCode = ErrorCode.UNAUTHORIZED;
  status= 401;

  constructor() {
    super("Authorization");
  }
}
