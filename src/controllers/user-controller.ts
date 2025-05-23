import { AuthenticatedRequest } from "../middlewares/auth-middleware";
import userService, { CreateUserParams } from "../service/user-service";
import { Request, Response } from "express";
import * as httpStatus from "http-status";

function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export const postUser = async (req: Request, res: Response) => {
  const { name, email, password, image, course, category } = req.body as CreateUserParams;

  const imageString = image as unknown as string;
  const imageBuffer = Buffer.from(imageString.split(",")[1], "base64");

  try {
    await userService.createUser({ name, email, password, image: imageBuffer, course, category });
    return res.sendStatus(httpStatus.CREATED);
  } catch (error: unknown) {
    if (isError(error)) {
      if (error.message === "DuplicatedEmailError") {
        return res.status(httpStatus.CONFLICT).send(error.message);
      }
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Unknown error occurred");
  }
};

export const getUsers = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const result = await userService.readUsers();
    return res.status(httpStatus.OK).send(result);
  } catch (error: unknown) {
    if (isError(error)) {
      return res.status(httpStatus.BAD_REQUEST).send(error.message);
    }
    return res.status(httpStatus.BAD_REQUEST).send("Unknown error occurred");
  }
};

export const getUserById = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userService.readUserById(Number(userId));
    return res.status(httpStatus.OK).send(result);
  } catch (error: unknown) {
    if (isError(error)) {
      if (error.message === "NotFoundError") {
        return res.status(httpStatus.NOT_FOUND).send(error.message);
      }
      return res.status(httpStatus.BAD_REQUEST).send(error.message);
    }
    return res.status(httpStatus.BAD_REQUEST).send("Unknown error occurred");
  }
};
