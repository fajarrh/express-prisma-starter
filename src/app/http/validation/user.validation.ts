import * as z from "zod";

export const createUserSchema = (zod: typeof z) =>
  zod.object({
    name: zod.string(),
    email: zod.string(),
    phoneNumber: zod.string(),
    password: zod.string().optional().nullish(),
  });

export type CreateUserSchema = z.infer<ReturnType<typeof createUserSchema>>;

export const updateUserSchema = (zod: typeof z) =>
  createUserSchema(zod).extend({ id: zod.number() });

export type UpdateUserSchema = z.infer<ReturnType<typeof updateUserSchema>>;
