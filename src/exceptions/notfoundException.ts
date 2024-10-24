import { StatusCode, HttpException } from "./httpException";

export class NotFoundException extends HttpException {
  constructor(message: string, statusCode: StatusCode, error: object) {
    super(message, statusCode, error);
  }
}
