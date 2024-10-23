import { StatusCode, HttpException } from "./httpException";

export class InternalException extends HttpException {
  constructor(message: string, statusCode: StatusCode, error: object) {
    super(message, statusCode, error);
  }
}
