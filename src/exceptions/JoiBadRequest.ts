import { StatusCode, HttpException } from "./httpException";
export class JoiBadException extends HttpException {
  constructor(message: string, error: any) {
    error = error.error.details.map((e: any) => e.message);
    super(message, StatusCode.BAD_REQUEST, error);
  }
}
