import { prisma } from "../config/index";
import { NextFunction, Request, Response } from "express";
import * as httpStatus from "http-status";
import * as jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  userId?: number;
}

export const authToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return generateUnauthorizedResponse(res);

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT secret is not defined");
    }

    const { userId } = jwt.verify(token, secret) as { userId: number };

    const session = await prisma.session.findFirst({ where: { token } });

    if (!session) return generateUnauthorizedResponse(res);

    req.userId = userId;

    return next();
  } catch (error) {
    return generateUnauthorizedResponse(res);
  }
};

const generateUnauthorizedResponse = (res: Response) => {
  return res.status(httpStatus.UNAUTHORIZED).send("You must be signed in to continue");
};
