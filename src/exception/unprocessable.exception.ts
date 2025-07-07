export default class UnprocessableException extends Error {
  respCode = 422;
  constructor(error: any = "") {
    super(JSON.stringify(error));
  }
}
