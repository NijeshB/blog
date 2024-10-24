import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../models/token";
import { PostStatus, Role } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import { AuthException } from "../exceptions/authException";

export const setAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let token = await getAuthToken(req);
  if (token && token.role == Role.ADMIN) {
    req.isAdmin = true;
  }

  next();
};

export const validateRole = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.body.role) {
    req.body.role = req.isAdmin ? req.body.role : Role.USER;
  }
  next();
};
const getAuthToken = async (req: Request) => {
  let authToken = req.header("authorization") || "";
  if (authToken) {
    authToken = authToken.replace("Bearer", "");
    return (await verifyToken(authToken)) as JwtPayload;
  }
  return false;
};

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authToken = await getAuthToken(req);

  if (!authToken) {
    throw new AuthException("Unauthorized", {
      error: "Token is missing or invalid!",
    });
  }
  if (authToken) {
    req.userId = authToken.userId;
    next();
  }
};

export const publishPost = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.isAdmin) {
    req.body.status = PostStatus.PUBLISHED;
  }
  next();
};
