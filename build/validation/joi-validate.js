"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.joiCommonValidate = exports.validateType = void 0;
const user_1 = __importStar(require("../validation/user"));
const JoiBadRequest_1 = require("../exceptions/JoiBadRequest");
const posts_1 = require("./posts");
const category_1 = require("./category");
var validateType;
(function (validateType) {
    validateType[validateType["SignUp"] = 0] = "SignUp";
    validateType[validateType["Token"] = 1] = "Token";
    validateType[validateType["Post"] = 2] = "Post";
    validateType[validateType["Category"] = 3] = "Category";
})(validateType || (exports.validateType = validateType = {}));
const joiCommonValidate = (validationType_1, data_1, ...args_1) => __awaiter(void 0, [validationType_1, data_1, ...args_1], void 0, function* (validationType, data, options = joiDefaultOptions) {
    let joiValidator;
    switch (validationType) {
        case 0:
            joiValidator = user_1.default;
            break;
        case 1:
            joiValidator = user_1.TokenValidator;
            break;
        case 2:
            joiValidator = posts_1.PostValidator;
            break;
        case 3:
            joiValidator = category_1.CategoryValidator;
            break;
    }
    if (joiValidator) {
        const validate = yield joiValidator.validate(data, options);
        if (validate.error) {
            throw new JoiBadRequest_1.JoiBadException("Bad Request!", validate);
        }
    }
    return true;
});
exports.joiCommonValidate = joiCommonValidate;
const joiDefaultOptions = {
    abortEarly: false,
    allowUnknown: true,
};
exports.default = joiDefaultOptions;
