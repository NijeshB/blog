"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
exports.errorHandler = errorHandler;
const httpException_1 = require("./exceptions/httpException");
const bad_requests_1 = require("./exceptions/bad-requests");
const internalException_1 = require("./exceptions/internalException");
const JoiBadRequest_1 = require("./exceptions/JoiBadRequest");
const client_1 = require("@prisma/client");
const library_1 = require("@prisma/client/runtime/library");
const handler = (method) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            yield method(req, res, next);
        }
        catch (error) {
            let exception;
            if (error instanceof httpException_1.HttpException) {
                exception = error;
            }
            else if (error instanceof JoiBadRequest_1.JoiBadException) {
                exception = error;
            }
            else if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code == "P2002") {
                    let meta = (_a = error.meta) === null || _a === void 0 ? void 0 : _a.modelName;
                    let msg = "";
                    if (meta == "Post") {
                        msg = "Given post title is already exists!";
                    }
                    else if (meta == "User") {
                        msg = "Given email id is already exists!";
                    }
                    else {
                        msg = "Something went wrong!";
                    }
                    exception = new bad_requests_1.BadException("Bad Requests", httpException_1.StatusCode.UNIQUE_CONSTRAINT_FAIL, {
                        code: error.code,
                        message: msg,
                        //meta: error.meta,
                        error,
                    });
                }
                else {
                    exception = new internalException_1.InternalException("Internal Server Error", httpException_1.StatusCode.INTERNAL_ERROR, { error: "Something went wrong!!" });
                }
            }
            else if (error instanceof library_1.PrismaClientValidationError) {
                exception = new bad_requests_1.BadException("Bad Requests", httpException_1.StatusCode.BAD_REQUEST, {
                    message: error.message,
                    error,
                });
            }
            else {
                exception = new internalException_1.InternalException("Internal Server Error", httpException_1.StatusCode.INTERNAL_ERROR, {
                    error: "Something went wrong!",
                    errorObj: error,
                });
            }
            next(exception);
        }
    });
};
exports.handler = handler;
function errorHandler(error, req, res, next) {
    res.status(error.statusCode).json({
        status: "error",
        message: error.message,
        error: error.errors,
    });
}
