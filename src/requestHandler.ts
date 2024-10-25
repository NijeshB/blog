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
      if (error instanceof HttpException) {
        exception = error;
      } else if (error instanceof JoiBadException) {
        exception = error;
      } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code == "P2002") {
          let meta = error.meta?.modelName;
          let msg = "";
          if (meta == "Post") {
            msg = "Given post title is already exists!";
          } else if (meta == "User") {
            msg = "Given email id is already exists!";
          } else {
            msg = "Something went wrong!";
          }
          exception = new BadException(
            "Bad Requests",
            StatusCode.UNIQUE_CONSTRAINT_FAIL,
            {
              code: error.code,
              message: msg,
              //meta: error.meta,
              error,
            },
          );
        } else {
          exception = new InternalException(
            "Internal Server Error",
            StatusCode.INTERNAL_ERROR,
            { error: "Something went wrong!!" },
          );
        }
      } else {
        exception = new InternalException(
          "Internal Server Error",
          StatusCode.INTERNAL_ERROR,
          {
            error: "Something went wrong!",
            errorObj: error,
          },
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
