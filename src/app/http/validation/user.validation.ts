import * as zod from "zod";

export const createUserSchema = zod.object({
  name: zod.string(),
  email: zod.string(),
  phoneNumber: zod.string(),
  password: zod.string().optional().nullish(),
});

export type CreateUserSchema = zod.infer<typeof createUserSchema>;

export const updateUserSchema = createUserSchema.extend({ id: zod.number() });

export type UpdateUserSchema = zod.infer<typeof updateUserSchema>;
