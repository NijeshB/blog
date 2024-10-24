import UserSignUpValidator, { TokenValidator } from "../validation/user";
import joiDefaultOptions from "../validation/joi-options";
import { JoiBadException } from "../exceptions/JoiBadRequest";
export enum validateType {
  SignUp,
  Token,
}
import { NextFunction } from "express";
export const joiCommonValidate = async (
  validationType: validateType,
  data: object,
  options: object = joiDefaultOptions,
) => {
  let joiValidator;
  switch (validationType) {
    case 0:
      joiValidator = UserSignUpValidator;
      break;
    case 1:
      joiValidator = TokenValidator;
      break;
  }

  if (joiValidator) {
    const validate = await joiValidator.validate(data, options);
    if (validate.error) {
      throw new JoiBadException("Bad Request!", validate);
    }
  }

  return true;
};
