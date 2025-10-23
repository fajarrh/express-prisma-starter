import * as zod from "zod";

export const loginSchema = zod.object({
  email: zod.string().email().nonempty(),
  password: zod.string().nonempty(),
});

export type LoginSchema = zod.infer<typeof loginSchema>;

export const registerSchema = zod.object({
  name: zod.string().nonempty(),
  email: zod.string().email().nonempty(),
  phoneNumber: zod.string().min(10).max(16).nonempty(),
  password: zod.string().nonempty(),
});
export type RegisterSchema = zod.infer<typeof registerSchema>;
