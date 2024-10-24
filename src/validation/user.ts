import Joi from "joi";

const UserSignUpValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
});

export default UserSignUpValidator;

export const TokenValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
