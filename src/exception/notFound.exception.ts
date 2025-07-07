export default class NotFoundException extends Error {
  respCode = 404;

  constructor(message = "Not Found") {
    super(message);
  }
}
