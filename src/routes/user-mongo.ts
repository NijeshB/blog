import express, { Request, Response, Router } from "express";
import User, { IUser } from "../models/user-mongo";
import mongoose from "mongoose";

const userRouter: Router = express.Router();

const UserSignUp = async (req: Request, res: Response): Promise<any> => {
  //const { name; email; status? } = req.body;
  const userData: IUser = {
    name: req.body.name,
    email: req.body.email,
    status: req.body.status,
  };

  try {
    const newUser = new User(userData);

    await newUser.save();

    res
      .status(200)
      .json({ message: "User created successfully", user: newUser })
      .end();
  } catch (error) {
    console.log("Error in User Signup", error);

    if (error instanceof mongoose.Error.ValidationError) {
      res
        .status(400)
        .json({ message: "Validation Error", errors: error.errors });
    }
    // Handle other potential errors (e.g., duplicate email)
    res.status(500).json({ message: "Error creating user", error }).end();
  }
};

userRouter.post("/signup", UserSignUp);
export default userRouter;
