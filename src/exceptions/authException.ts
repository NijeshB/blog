import { StatusCode, HttpException } from "./httpException";

export class AuthException extends HttpException {
  constructor(
    message: string,
    error: object,
    statusCode: StatusCode = StatusCode.UNAUTHORIZED,
  ) {
    super(message, statusCode, error);
  }
}
