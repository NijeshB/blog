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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = exports.verifyToken = void 0;
const authException_1 = require("../exceptions/authException");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secrets_1 = require("../secrets");
const verifyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield jsonwebtoken_1.default.verify(token.trim(), secrets_1.secrets.JWT_SECRET);
    }
    catch (error) {
        throw new authException_1.AuthException("Token Error", error);
    }
});
exports.verifyToken = verifyToken;
const createToken = (tokenData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const signOptions = {
            algorithm: secrets_1.secrets.JWT_HASH,
            expiresIn: secrets_1.secrets.JWT_EXPIRE,
        };
        return jsonwebtoken_1.default.sign(tokenData, secrets_1.secrets.JWT_SECRET, signOptions);
    }
    catch (error) { }
});
exports.createToken = createToken;
