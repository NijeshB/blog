"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_1 = require("../models/category");
const requestHandler_1 = require("../requestHandler");
const categoryRouter = express_1.default.Router();
categoryRouter.post("/", (0, requestHandler_1.handler)(category_1.createCategory));
exports.default = categoryRouter;
