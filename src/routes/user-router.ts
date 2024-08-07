import { Router } from "express";
import { getUsers, postUser } from "@/controllers/user-controller";
import { validateBody } from "@/middlewares/validation-middleware";
import { createUserSchema } from "@/schemas/user-schema";
import { authToken } from "@/middlewares/auth-middleware";

const userRouter = Router();

userRouter
  .post("/sign-up", validateBody(createUserSchema), postUser)
  .get("/", authToken, getUsers);

export { userRouter };
