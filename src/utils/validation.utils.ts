import * as z from "zod";

export default class Validation<T extends z.ZodObject<any>> {
  schema: T;
  payload: z.infer<T>;
  validated: z.infer<T>;
  _error: Record<string, any>[];
  constructor(schema?: T, payload?: z.infer<T>) {
    if (schema) {
      this.schema = schema;
    }

    if (payload) {
      this.payload = payload;
    }
  }

  async _validate() {
    try {
      this.validated = await this.schema.parseAsync(this.payload);
      return false;
    } catch (error) {
      if (error instanceof z.ZodError) {
        this._error = error.issues.reduce((p: Record<string, any>[], { path, code, ...n }) => {
          return [...p, { path: path.at(0) ?? "", type: code, ...n }];
        }, []);
      }
      return true;
    }
  }

  fails() {
    return this._validate();
  }

  async validation(schema: T) {
    try {
      return await schema.parseAsync(this.payload);
    } catch (error) {
      throw error;
    }
  }

  errors() {
    return this._error;
  }

  static body(payload) {
    return async function (schema) {
      try {
        return await schema.parseAsync(payload);
      } catch (error) {
        throw error;
      }
    };
  }
}
