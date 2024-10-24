import { Request, Response } from "express";
import { joiCommonValidate, validateType } from "../validation/joi-validate";
import slugify from "slugify";
import { prismaClient } from "../app";

export const CreatePost = async (req: Request, res: Response) => {
  const postData = { ...req.body };

  await joiCommonValidate(validateType.Post, postData);

  const slug = slugify(postData.title);
  const post = await prismaClient.post.create({
    data: {
      ...postData,
      slug,
      userId: req.userId,
    },
  });
  res.send("OK");
};
