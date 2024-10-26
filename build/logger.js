"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const secrets_1 = require("./secrets");
const silentLog = secrets_1.secrets.ENABLE_LOG
    ? secrets_1.secrets.ENABLE_LOG === "true"
    : true;
exports.logger = winston_1.default.createLogger({
    level: "info",
    format: winston_1.default.format.json(),
    silent: !silentLog,
    transports: [
        new winston_1.default.transports.Console(),
        new winston_1.default.transports.File({ filename: "combined.log" }),
    ],
});
