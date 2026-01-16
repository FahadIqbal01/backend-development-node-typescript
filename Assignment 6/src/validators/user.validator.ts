import zod from "zod";

export const userValidator = zod.object({
  name: zod.string(),
  email: zod.string(),
  password: zod.string(),
  role: zod.string().default("user"),
  age: zod.number().min(18),
  isActive: zod.boolean().default(true),
});

export const loginValidator = zod.object({
  email: zod.string(),
  password: zod.string(),
});

export const userValidatorForPartialUpdate = userValidator.partial();
