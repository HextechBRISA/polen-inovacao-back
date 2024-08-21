import authService, { SignInParams } from "../service/auth-service";
import { Request, Response } from "express";
import * as httpStatus from "http-status";

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export const postSignIn = async (req: Request, res: Response) => {
  const { email, password } = req.body as SignInParams;

  try {
    const result = await authService.signIn({ email, password });
    return res.status(httpStatus.OK).send(result);
  } catch (error: unknown) {
    if (isError(error)) {
      if (error.message === "email or password are incorrect") {
        return res.status(httpStatus.UNAUTHORIZED).send(error.message);
      }
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Unknown error occurred");
  }
};
