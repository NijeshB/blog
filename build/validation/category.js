"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryValidator = void 0;
const joi_1 = __importDefault(require("joi"));
//https://stackoverflow.com/questions/48720942/node-js-joi-how-to-display-a-custom-error-messages
exports.CategoryValidator = joi_1.default.array().items(joi_1.default.string().required().min(3));
//   .messages({
//     "string.min": (value: any) => {
//       return `"${value} category name must be a string"`;
//     },
//   })
//   .error((e) => {
//     //console.log(e.value);
//     return e;
//   });
