"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostValidator = void 0;
const client_1 = require("@prisma/client");
const joi_1 = __importDefault(require("joi"));
exports.PostValidator = joi_1.default.object({
    title: joi_1.default.string().required(),
    content: joi_1.default.string().required(),
    status: joi_1.default.string()
        .valid(...Object.values(client_1.PostStatus))
        .messages({
        "any.only": "Given `status` is invalid",
    }),
    category: joi_1.default.string().min(3),
});
