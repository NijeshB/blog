"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoiBadException = void 0;
const httpException_1 = require("./httpException");
class JoiBadException extends httpException_1.HttpException {
    constructor(message, error) {
        error = error.error.details.map((e) => e.message);
        super(message, httpException_1.StatusCode.BAD_REQUEST, error);
    }
}
exports.JoiBadException = JoiBadException;
