import Joi from "joi";

export const CategoryValidator = Joi.object({
  name: Joi.string().required().min(3),
});
