"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClient = void 0;
const express_1 = __importDefault(require("express"));
const secrets_1 = require("./secrets");
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const user_1 = __importDefault(require("./routes/user"));
const client_1 = require("@prisma/client");
const requestHandler_1 = require("./requestHandler");
const logger_1 = require("./logger");
const posts_1 = __importDefault(require("./routes/posts"));
const category_1 = __importDefault(require("./routes/category"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    credentials: true,
}));
app.use((0, compression_1.default)());
app.use("/users", user_1.default);
app.use("/posts", posts_1.default);
app.use("/category", category_1.default);
exports.prismaClient = new client_1.PrismaClient({ log: ["query"] });
app.listen(secrets_1.secrets.PORT, () => {
    logger_1.logger.info(`App is running in port ${secrets_1.secrets.PORT}`);
});
app.use(requestHandler_1.errorHandler);
app.get("*", function (req, res) {
    res
        .status(404)
        .json({ status: "error", message: "Given route is not found" });
});
