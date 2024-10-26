"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadException = void 0;
const httpException_1 = require("./httpException");
class BadException extends httpException_1.HttpException {
    constructor(message, statusCode, error) {
        super(message, statusCode, error);
    }
}
exports.BadException = BadException;
