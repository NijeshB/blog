import { Request, Response } from "express";
import { prismaClient } from "../app";
import { joiCommonValidate, validateType } from "../validation/joi-validate";

export const getCategory = async (req: Request, res: Response) => {
  await prismaClient.category.findMany({});
};

const getExistCategory = async (categories: object) => {
  await prismaClient.category.findMany({
    where: {
      //in:
    },
  });
};
export const createCategory = async (req: Request, res: Response) => {
  const categoryName = { ...req.body };
  await joiCommonValidate(validateType.Category, categoryName);
  const category = await prismaClient.category.create({
    data: categoryName,
  });

  res.status(200).json({ status: "success", data: category });
};
