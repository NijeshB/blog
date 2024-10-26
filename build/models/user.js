"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deleteAllUser = exports.getToken = exports.getUserById = exports.UserSignUp = void 0;
const joi_validate_1 = require("../validation/joi-validate");
const app_1 = require("../app");
const logger_1 = require("../logger");
const bad_requests_1 = require("../exceptions/bad-requests");
const httpException_1 = require("../exceptions/httpException");
const bcrypt_1 = __importStar(require("bcrypt"));
const lodash_1 = require("lodash");
const notfoundException_1 = require("../exceptions/notfoundException");
const token_1 = require("./token");
function hashedRandomPassword(length) {
    const pass = "test@123"; //randomBytes(length).toString("base64").slice(0, length);
    return bcrypt_1.default.hashSync(pass, 12);
}
const UserSignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = Object.assign({}, req.body);
    yield (0, joi_validate_1.joiCommonValidate)(joi_validate_1.validateType.SignUp, userData);
    const userExists = yield getUserByEmail(userData.email);
    if (userExists) {
        throw new bad_requests_1.BadException("Given email already exists!", httpException_1.StatusCode.UNIQUE_CONSTRAINT_FAIL, {});
    }
    logger_1.logger.info("User Validation:", userData);
    const createUser = yield app_1.prismaClient.user.create({
        data: Object.assign(Object.assign({}, userData), { password: hashedRandomPassword(12) }),
    });
    const userResponse = (0, lodash_1.omit)(createUser, "password");
    logger_1.logger.info("User Created:", userResponse);
    res.status(200).json({
        status: "success",
        message: "User created successfully!",
        data: userResponse,
    });
});
exports.UserSignUp = UserSignUp;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield app_1.prismaClient.user.findUnique({
        where: {
            id: +req.params.id,
        },
    });
    if (!user) {
        throw new notfoundException_1.NotFoundException("User not found!", httpException_1.StatusCode.NOT_FOUND, {});
    }
    const userResponse = (0, lodash_1.omit)(user, "password");
    logger_1.logger.info("User details", userResponse);
    res.status(200).json({ status: "success", data: userResponse });
});
exports.getUserById = getUserById;
const getToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, joi_validate_1.joiCommonValidate)(joi_validate_1.validateType.Token, req.body);
    const user = yield getUserByEmail(req.body.email);
    if (!user) {
        throw new notfoundException_1.NotFoundException("User not found", httpException_1.StatusCode.NOT_FOUND, {});
    }
    if (!(0, bcrypt_1.compareSync)(req.body.password, user.password)) {
        throw new bad_requests_1.BadException("Invalid username or password", httpException_1.StatusCode.BAD_REQUEST, {});
    }
    const token = yield (0, token_1.createToken)({
        userId: user.id,
        role: user.role,
    });
    res.status(200).json({ status: "success", token });
});
exports.getToken = getToken;
const deleteAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteUsers = yield app_1.prismaClient.user.deleteMany({});
    res.status(200).json({ status: "success", data: deleteUsers });
});
exports.deleteAllUser = deleteAllUser;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield app_1.prismaClient.user.findFirst({
        where: {
            email,
        },
    });
});
