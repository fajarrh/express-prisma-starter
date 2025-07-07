export default class ForbiddenException extends Error {
  respCode = 403;

  constructor(error: any = "") {
    super(JSON.stringify(error));
  }
}
