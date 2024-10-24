import express, { Router } from "express";
import { handler } from "../requestHandler";
import {
  UserSignUp,
  deleteAllUser,
  getToken,
  getUserById,
} from "../models/user";

const userRouter: Router = express.Router();

userRouter.post("/signup", handler(UserSignUp));
userRouter.get("/token", handler(getToken));
userRouter.get("/:id", handler(getUserById));
userRouter.delete("/all", handler(deleteAllUser));
export default userRouter;
