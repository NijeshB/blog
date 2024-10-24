import express, { Router } from "express";
import { handler } from "../requestHandler";
import { CreatePost } from "../models/posts";
import { auth, publishPost, setAdmin } from "../middlewares/token";

const postRouter: Router = express.Router();

postRouter.post(
  "/",
  [handler(setAdmin), handler(auth), publishPost],
  handler(CreatePost),
);
// postRouter.post(
//   "/create",
//   [handler(setAdmin), validateRole],
//   handler(UserSignUp),
// );
// postRouter.get("/token", handler(getToken));
// postRouter.get("/:id", handler(getUserById));
// postRouter.delete("/all", handler(deleteAllUser));
export default postRouter;
