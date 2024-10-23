import Joi from "joi";

export interface IUserCreate {
  name: string;
  email: string;
}

const UserSignUpValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
});

export default UserSignUpValidator;
