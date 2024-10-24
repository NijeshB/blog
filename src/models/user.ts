import { NextFunction, Request, Response } from "express";
import { joiCommonValidate, validateType } from "../validation/joi-validate";
import { prismaClient } from "../app";
import { logger } from "../logger";
import { BadException } from "../exceptions/bad-requests";
import { StatusCode } from "../exceptions/httpException";
import { randomBytes } from "crypto";
import bcrypt, { compareSync } from "bcrypt";
import { omit } from "lodash";
import { NotFoundException } from "../exceptions/notfoundException";
import jwt from "jsonwebtoken";
import { secrets } from "../secrets";

function hashedRandomPassword(length: number): string {
  const pass = "test@123"; //randomBytes(length).toString("base64").slice(0, length);
  return bcrypt.hashSync(pass, 12);
}

export const UserSignUp = async (req: Request, res: Response) => {
  const userData = req.body;
  await joiCommonValidate(validateType.SignUp, userData);

  const userExists = await getUserByEmail(userData.email);
  if (userExists) {
    throw new BadException(
      "Given email already exists!",
      StatusCode.UNIQUE_CONSTRAINT_FAIL,
      {},
    );
  }

  logger.info("User Validation:", userData);
  const createUser = await prismaClient.user.create({
    data: { ...userData, password: hashedRandomPassword(12) },
  });
  const userResponse = omit(createUser, "password");

  logger.info("User Created:", userResponse);
  res.status(200).json({
    status: "success",
    message: "User created successfully!",
    data: userResponse,
  });
};

export const getUserById = async (req: Request, res: Response) => {
  const user = await prismaClient.user.findUnique({
    where: {
      id: +req.params.id,
    },
  });

  if (!user) {
    throw new NotFoundException("User not found!", StatusCode.NOT_FOUND, {});
  }
  const userResponse = omit(user, "password");
  logger.info("User details", userResponse);
  res.status(200).json({ status: "success", data: userResponse });
};

export const getToken = async (req: Request, res: Response) => {
  await joiCommonValidate(validateType.Token, req.body);
  const user = await getUserByEmail(req.body.email);

  if (!user) {
    throw new NotFoundException("User not found", StatusCode.NOT_FOUND, {});
  }

  if (!compareSync(req.body.password, user.password)) {
    throw new BadException(
      "Invalid username or password",
      StatusCode.BAD_REQUEST,
      {},
    );
  }

  const token = jwt.sign(
    {
      userId: user.id,
      name: user.name,
    },
    secrets.JWT_SECRET,
  );

  res.status(200).json({ status: "success", token });
};

export const deleteAllUser = async (req: Request, res: Response) => {
  const deleteUsers = await prismaClient.user.deleteMany({});

  res.status(200).json({ status: "success", data: deleteUsers });
};

const getUserByEmail = async (email: string) => {
  const user = await prismaClient.user.findFirst({
    where: {
      email,
    },
  });
  return user;
};
