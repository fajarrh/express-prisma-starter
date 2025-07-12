import * as z from "zod";

export const loginSchema = (zod: typeof z) =>
  zod.object({
    email: zod.string().email().nonempty(),
    password: zod.string().nonempty(),
  });

export type LoginSchema = z.infer<ReturnType<typeof loginSchema>>;

export const registerSchema = (zod: typeof z) =>
  zod.object({
    name: zod.string().nonempty(),
    email: zod.string().email().nonempty(),
    phoneNumber: zod.string().min(10).max(16).nonempty(),
    password: zod.string().nonempty(),
  });
export type RegisterSchema = z.infer<ReturnType<typeof registerSchema>>;
