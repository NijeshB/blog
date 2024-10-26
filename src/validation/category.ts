import { error } from "console";
import Joi, { string } from "joi";

//https://stackoverflow.com/questions/48720942/node-js-joi-how-to-display-a-custom-error-messages
export const CategoryValidator = Joi.array().items(
  Joi.string().required().min(3),
);
//   .messages({
//     "string.min": (value: any) => {
//       return `"${value} category name must be a string"`;
//     },
//   })
//   .error((e) => {
//     //console.log(e.value);
//     return e;
//   });
