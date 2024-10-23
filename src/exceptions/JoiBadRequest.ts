import { StatusCode, HttpException } from "./httpException";

export class JoiBadException extends HttpException {
  constructor(message: string, error: any) {
    console.log("Det", error.error.details);
    error = error.error.details.map((e: any) => e.message);
    console.log("Det1", error);
    super(message, StatusCode.BAD_REQUEST, error);
  }
}
