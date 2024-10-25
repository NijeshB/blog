import UserSignUpValidator, { TokenValidator } from "../validation/user";
import { JoiBadException } from "../exceptions/JoiBadRequest";
import { PostValidator } from "./posts";
import { CategoryValidator } from "./category";
export enum validateType {
  SignUp,
  Token,
  Post,
  Category,
}
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
    case 2:
      joiValidator = PostValidator;
      break;
    case 3:
      joiValidator = CategoryValidator;
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

const joiDefaultOptions = {
  abortEarly: false,
  allowUnknown: true,
};
export default joiDefaultOptions;
