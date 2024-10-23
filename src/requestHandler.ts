import { NextFunction, Request, Response } from "express";
import { HttpException, StatusCode } from "./exceptions/httpException";
import Joi from "joi";
import { BadException } from "./exceptions/bad-requests";
import { InternalException } from "./exceptions/internalException";
import { JoiBadException } from "./exceptions/JoiBadRequest";

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
        console.log("ds1");
        exception = error;
        // exception = new BadException(
        //   "Validation Fails",
        //   StatusCode.BAD_REQUEST,
        //   error.details,
        // );
      } else {
        exception = new InternalException(
          "Internal Server Error",
          StatusCode.INTERNAL_ERROR,
          { error: "Something went wrong!" },
        );
      }
      next(error);
    }
  };
};

export function errorHandler(
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(error.statusCode);
  res.status(error.statusCode).json({
    status: "error",
    message: error.message,
    error: error.errors,
  });
}
