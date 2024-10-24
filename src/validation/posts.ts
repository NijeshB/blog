import Joi from "joi";

export const PostValidator = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});
