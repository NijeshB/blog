import express, { NextFunction, Request, Response, Router } from "express";
import UserSignUpValidator from "../validation/user";
import { handler } from "../requestHandler";
import { JoiBadException } from "../exceptions/JoiBadRequest";

const userRouter: Router = express.Router();

const UserSignUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = req.body;
    const validate = await UserSignUpValidator.validate(userData, {
      abortEarly: false,
    });

    if (validate.error) {
      throw new JoiBadException("Bad Request!", validate);
    }
    //const createUser = await prismaClient.user.create();
    res.send("OK");
  } catch (err) {
    next(err);
  }
};

userRouter.post("/signup", handler(UserSignUp));
export default userRouter;
