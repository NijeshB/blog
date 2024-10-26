"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const requestHandler_1 = require("../requestHandler");
const user_1 = require("../models/user");
const token_1 = require("../middlewares/token");
const userRouter = express_1.default.Router();
userRouter.post("/signup", (0, requestHandler_1.handler)(user_1.UserSignUp));
userRouter.post("/create", [(0, requestHandler_1.handler)(token_1.setAdmin), token_1.validateRole], (0, requestHandler_1.handler)(user_1.UserSignUp));
userRouter.get("/token", (0, requestHandler_1.handler)(user_1.getToken));
userRouter.get("/:id", (0, requestHandler_1.handler)(user_1.getUserById));
userRouter.delete("/all", (0, requestHandler_1.handler)(user_1.deleteAllUser));
exports.default = userRouter;
