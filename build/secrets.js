"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.secrets = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: ".env" });
exports.secrets = dotenv_1.default.config({ path: ".env" }).parsed;
//export const PORT = process.env.PORT;
//export const MONGOOSE_URL = process.env.MONGOOSE_URL!;
//export const HASH_SECRET = process.env.HASH_SECRET!;
