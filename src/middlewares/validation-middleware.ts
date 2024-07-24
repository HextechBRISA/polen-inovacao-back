import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ZodSchema, ZodError } from "zod";

type ValidationMiddleware = (req: Request, res: Response, next: NextFunction)=> void;

export const validateBody = (schema: ZodSchema): ValidationMiddleware => {
  return validate(schema, "body");
};

const validate = (schema: ZodSchema, type: "body") => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req[type]);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.errors.map((err) => err.message));
      } else {
        next(error);
      }
    }
  };
};
