export default class BadRequestException extends Error {
  respCode = 400;

  constructor(error: any = "") {
    super(JSON.stringify(error));
  }
}
