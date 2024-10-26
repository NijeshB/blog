"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthException = void 0;
const httpException_1 = require("./httpException");
class AuthException extends httpException_1.HttpException {
    constructor(message, error, statusCode = httpException_1.StatusCode.UNAUTHORIZED) {
        super(message, statusCode, error);
    }
}
exports.AuthException = AuthException;
