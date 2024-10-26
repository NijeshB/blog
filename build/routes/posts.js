"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const requestHandler_1 = require("../requestHandler");
const posts_1 = require("../models/posts");
const token_1 = require("../middlewares/token");
const postRouter = express_1.default.Router();
postRouter.post("/", [(0, requestHandler_1.handler)(token_1.setAdmin), (0, requestHandler_1.handler)(token_1.auth), token_1.publishPost], (0, requestHandler_1.handler)(posts_1.CreatePost));
postRouter.get("/all", [(0, requestHandler_1.handler)(token_1.setAdmin), (0, requestHandler_1.handler)(token_1.auth)], (0, requestHandler_1.handler)(posts_1.getAllPost));
postRouter.get("/category/:name", [(0, requestHandler_1.handler)(token_1.setAdmin), (0, requestHandler_1.handler)(token_1.auth)], (0, requestHandler_1.handler)(posts_1.getPostByCategory));
postRouter.get("/", [(0, requestHandler_1.handler)(token_1.auth)], (0, requestHandler_1.handler)(posts_1.getPost));
// postRouter.post(
//   "/create",
//   [handler(setAdmin), validateRole],
//   handler(UserSignUp),
// );
// postRouter.get("/token", handler(getToken));
// postRouter.get("/:id", handler(getUserById));
// postRouter.delete("/all", handler(deleteAllUser));
exports.default = postRouter;
