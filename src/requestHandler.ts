import { NextFunction, Request, Response } from "express";
import { HttpException, StatusCode } from "./exceptions/httpException";
import Joi from "joi";
import { BadException } from "./exceptions/bad-requests";
import { InternalException } from "./exceptions/internalException";
import { JoiBadException } from "./exceptions/JoiBadRequest";
import { Prisma } from "@prisma/client";

export const handler = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (error) {
      let exception: HttpException;
      console.log("fe1", error);
      if (error instanceof HttpException) {
        exception = error;
      } else if (error instanceof JoiBadException) {
        exception = error;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        exception = new BadException("Bad Requests", StatusCode.BAD_REQUEST, {
          code: error.code,
          message: error.message,
          meta: error.meta,
        });
      } else {
        exception = new InternalException(
          "Internal Server Error",
          StatusCode.INTERNAL_ERROR,
          { error: "Something went wrong!" },
        );
      }
      next(exception);
    }
  };
};

export function errorHandler(
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.status(error.statusCode).json({
    status: "error",
    message: error.message,
    error: error.errors,
  });
}
