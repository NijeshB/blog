import { PostStatus } from "@prisma/client";
import Joi, { valid } from "joi";

export const PostValidator = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  status: Joi.string()
    .valid(...Object.values(PostStatus))
    .messages({
      "any.only": "Given `status` is invalid",
    }),
  category: Joi.string().min(3),
});
