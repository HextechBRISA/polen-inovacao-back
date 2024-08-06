import { z } from "zod";

export const authSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6).max(50),
  })
  .strict();

export type CreateUserParams = z.infer<typeof authSchema>;
