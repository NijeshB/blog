export class HttpException extends Error {
  message: string;
  statusCode: StatusCode;
  errors: Object;

  constructor(message: string, statusCode: StatusCode, error: object) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.errors = error;
  }
}

export enum StatusCode {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
}
