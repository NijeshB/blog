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
exports.publishPost = exports.auth = exports.validateRole = exports.setAdmin = void 0;
const token_1 = require("../models/token");
const client_1 = require("@prisma/client");
const authException_1 = require("../exceptions/authException");
const setAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = yield getAuthToken(req);
    if (token && token.role == client_1.Role.ADMIN) {
        req.isAdmin = true;
    }
    next();
});
exports.setAdmin = setAdmin;
const validateRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.role) {
        req.body.role = req.isAdmin ? req.body.role : client_1.Role.USER;
    }
    next();
});
exports.validateRole = validateRole;
const getAuthToken = (req) => __awaiter(void 0, void 0, void 0, function* () {
    let authToken = req.header("authorization") || "";
    if (authToken) {
        authToken = authToken.replace("Bearer", "");
        return (yield (0, token_1.verifyToken)(authToken));
    }
    return false;
});
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authToken = yield getAuthToken(req);
    if (!authToken) {
        throw new authException_1.AuthException("Unauthorized", {
            error: "Token is missing or invalid!",
        });
    }
    if (authToken) {
        req.userId = authToken.userId;
        next();
    }
});
exports.auth = auth;
const publishPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.isAdmin && !req.body.status) {
        req.body.status = client_1.PostStatus.PUBLISHED;
    }
    next();
});
exports.publishPost = publishPost;
