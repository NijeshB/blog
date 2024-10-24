import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../models/user";
import { Role } from "@prisma/client";

export const setAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let authToken = getAuthToken(req);
  if (authToken) {
    const { role } = await verifyToken(authToken);
    if (role == Role.ADMIN) {
      req.isAdmin = true;
    }
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
const getAuthToken = (req: Request) => {
  let authToken = req.header("authorization") || "";
  if (authToken) {
    authToken = authToken.replace("Bearer", "");
  }
  return authToken;
};
