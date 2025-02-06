import * as yup from "yup";

export const userSchema = (y: typeof yup) =>
  y.object().shape({
    id: y
      .number()
      .when("$method", {
        is: (method) => method === "PUT",
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.notRequired(),
      })
      .label("id"),
    name: y.string().required().label("name"),
    email: y.string().required().label("email"),
    phoneNumber: y.string().required().label("phone number"),
    password: y.string().optional().label("password"),
  });

export type UserSchema = yup.InferType<ReturnType<typeof userSchema>>;
