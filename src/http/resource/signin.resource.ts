import Resource from "frexp/lib/Resource";

export default class SigninResource extends Resource {
  toArray() {
    return {
      token: this.token,
      user: this.user,
    };
  }
}
