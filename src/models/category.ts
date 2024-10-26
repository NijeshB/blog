import { Request, Response } from "express";
import { prismaClient } from "../app";
import { joiCommonValidate, validateType } from "../validation/joi-validate";

type categoryList = string | string[];
export const getCategory = async (req: Request, res: Response) => {
  await prismaClient.category.findMany({});
};

export const createCategory = async (req: Request, res: Response) => {
  const category = await createBulkCatgory(req.body.category);
  res.status(200).json({ status: "success", data: category });
};

export const createBulkCatgory = async (category: categoryList) => {
  category = typeof category == "string" ? [category] : category!;
  category = category.filter((cat: string) => cat !== "" && cat !== undefined);

  await joiCommonValidate(validateType.Category, category);
  const categoryList = category.map((cat: string) => {
    return { name: cat };
  });
  return await prismaClient.category.createMany({
    data: categoryList,
    skipDuplicates: true,
  });
};
