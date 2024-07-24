import userService from "@/service/user-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export const postUser = async (req: Request, res: Response) => {
  const { name, email, password, image, course, category } = req.body;
  
  const imageBuffer = Buffer.from(image.split(",")[1], "base64");

  try {
    await userService.createUser({ name, email, password, image: imageBuffer, course, category });

    return res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    if (error.message === "DuplicatedEmailError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
};
