import { ErrorCode } from "@constant/error-code.constant";

export default class NotFoundException extends Error {
  respCode = ErrorCode.NOT_FOUND;
  status = 404;
  entity: string | null = null;

  constructor(entity: string | null = null, message = "Not Found") {
    super(message);
    this.entity = entity;
  }
}
