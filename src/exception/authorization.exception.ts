export default class AuthorizationException extends Error {
  respCode = 401;

  constructor() {
    super("Authorization");
  }
}
