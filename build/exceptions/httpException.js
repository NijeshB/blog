"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusCode = exports.HttpException = void 0;
class HttpException extends Error {
    constructor(message, statusCode, error) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.errors = error;
    }
}
exports.HttpException = HttpException;
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["SUCCESS"] = 200] = "SUCCESS";
    StatusCode[StatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    StatusCode[StatusCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    StatusCode[StatusCode["UNIQUE_CONSTRAINT_FAIL"] = 422] = "UNIQUE_CONSTRAINT_FAIL";
    StatusCode[StatusCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    StatusCode[StatusCode["INTERNAL_ERROR"] = 500] = "INTERNAL_ERROR";
})(StatusCode || (exports.StatusCode = StatusCode = {}));
