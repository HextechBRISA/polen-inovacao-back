import { z } from "zod";

export const createUserSchema = z
  .object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(6).max(50),
    confirmPassword: z.string().min(6).max(50),
    image: z.string(),
    course: z.string(),
    category: z.enum(["Residente", "Mentor", "Admin"]),
  })
  .strict();

export type CreateUserParams = z.infer<typeof createUserSchema>;
