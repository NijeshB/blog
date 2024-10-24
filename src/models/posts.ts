import { Request, Response } from "express";
import { joiCommonValidate, validateType } from "../validation/joi-validate";
import slugify from "slugify";
import { prismaClient } from "../app";
import { omit } from "lodash";

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
  const postResponse = omit(post, ["userId", "createdAt"]);
  res.status(200).json({
    status: "success",
    message: "Post created successfully!",
    data: { postResponse },
  });
};
