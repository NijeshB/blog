import Joi from "joi";

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

const UserSignUpValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
});

export default UserSignUpValidator;

export const TokenValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
