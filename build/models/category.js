"use strict";
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
exports.createBulkCatgory = exports.createCategory = exports.getCategory = void 0;
const app_1 = require("../app");
const joi_validate_1 = require("../validation/joi-validate");
const getCategory = (categoryList) => __awaiter(void 0, void 0, void 0, function* () {
    if (!categoryList.length) {
        return [];
    }
    const category = yield app_1.prismaClient.category.findMany({
        where: {
            name: {
                in: categoryList,
            },
        },
        select: {
            id: true,
        },
    });
    return category;
    //return category.map((cat) => cat.id);
});
exports.getCategory = getCategory;
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield (0, exports.createBulkCatgory)(req.body.category);
    res.status(200).json({ status: "success", data: category });
});
exports.createCategory = createCategory;
const createBulkCatgory = (category) => __awaiter(void 0, void 0, void 0, function* () {
    category = typeof category == "string" ? [category] : category;
    category = category.filter((cat) => cat !== "" && cat !== undefined);
    yield (0, joi_validate_1.joiCommonValidate)(joi_validate_1.validateType.Category, category);
    const categoryList = category.map((cat) => {
        return { name: cat };
    });
    return yield app_1.prismaClient.category.createMany({
        data: categoryList,
        skipDuplicates: true,
    });
});
exports.createBulkCatgory = createBulkCatgory;
