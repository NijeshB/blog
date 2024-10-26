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
const express_1 = __importDefault(require("express"));
const user_mongo_1 = __importDefault(require("../models/user-mongo"));
const mongoose_1 = __importDefault(require("mongoose"));
const userRouter = express_1.default.Router();
const UserSignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //const { name; email; status? } = req.body;
    const userData = {
        name: req.body.name,
        email: req.body.email,
        status: req.body.status,
    };
    try {
        const newUser = new user_mongo_1.default(userData);
        yield newUser.save();
        res
            .status(200)
            .json({ message: "User created successfully", user: newUser })
            .end();
    }
    catch (error) {
        console.log("Error in User Signup", error);
        if (error instanceof mongoose_1.default.Error.ValidationError) {
            res
                .status(400)
                .json({ message: "Validation Error", errors: error.errors });
        }
        // Handle other potential errors (e.g., duplicate email)
        res.status(500).json({ message: "Error creating user", error }).end();
    }
});
userRouter.post("/signup", UserSignUp);
exports.default = userRouter;
