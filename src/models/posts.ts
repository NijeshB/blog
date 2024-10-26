import { Request, Response } from "express";
import { joiCommonValidate, validateType } from "../validation/joi-validate";
import slugify from "slugify";
import { prismaClient } from "../app";
import { omit } from "lodash";
import { createBulkCatgory, getCategory } from "./category";
import { connect } from "http2";

export const CreatePost = async (req: Request, res: Response) => {
  const { category, ...postData } = req.body;
  console.log(category, postData);
  const categoryList = await createBulkCatgory(category);

  const categoryDetails = await getCategory(category);
  console.log("categoryDetails", categoryDetails);
  //res.status(200).json({ data: categoryList });

  await joiCommonValidate(validateType.Post, postData);

  const slug = slugify(postData.title);
  const post = await prismaClient.post.create({
    data: {
      ...postData,
      slug,
      userId: req.userId,
      categories: {
        //create: categoryDetails,
        create: categoryDetails.map((category) => ({
          categoryId: category.id,
        })),
        //        connect: [{ id: 1 }, { id: 2 }],
      },
    },
    include: {
      categories: true,
      //category: true,
    },
  });
  const postResponse = omit(post, ["userId", "createdAt"]);
  res.status(200).json({
    status: "success",
    message: "Post created successfully!",
    data: { postResponse },
  });
};

export const getPost = async (req: Request, res: Response) => {
  const posts = await prismaClient.post.findMany({
    where: { userId: req.userId },
  });

  res.status(200).json({ status: "success", data: posts });
};

export const getAllPost = async (req: Request, res: Response) => {
  const where = req.isAdmin ? {} : { userId: req.userId };
  const posts = await prismaClient.post.findMany({
    where,
    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
  });

  res.status(200).json({ status: "success", data: posts });
};

export const getPostByCategory = async (req: Request, res: Response) => {
  const category = await getCategory([req.params.name]);
  console.log("category", category);
  const posts = await prismaClient.post.findMany({
    where: {
      userId: req.userId,
      categories: {
        some: {
          categoryId: category[0].id,
        },
      },
    },
    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
  });

  res.status(200).json({ status: "success", data: posts });
};
