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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostByCategory = exports.getAllPost = exports.getPost = exports.CreatePost = void 0;
const joi_validate_1 = require("../validation/joi-validate");
const slugify_1 = __importDefault(require("slugify"));
const app_1 = require("../app");
const lodash_1 = require("lodash");
const category_1 = require("./category");
const CreatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { category } = _a, postData = __rest(_a, ["category"]);
    console.log(category, postData);
    const categoryList = yield (0, category_1.createBulkCatgory)(category);
    const categoryDetails = yield (0, category_1.getCategory)(category);
    console.log("categoryDetails", categoryDetails);
    //res.status(200).json({ data: categoryList });
    yield (0, joi_validate_1.joiCommonValidate)(joi_validate_1.validateType.Post, postData);
    const slug = (0, slugify_1.default)(postData.title);
    const post = yield app_1.prismaClient.post.create({
        data: Object.assign(Object.assign({}, postData), { slug, userId: req.userId, categories: {
                //create: categoryDetails,
                create: categoryDetails.map((category) => ({
                    categoryId: category.id,
                })),
                //        connect: [{ id: 1 }, { id: 2 }],
            } }),
        include: {
            categories: true,
            //category: true,
        },
    });
    const postResponse = (0, lodash_1.omit)(post, ["userId", "createdAt"]);
    res.status(200).json({
        status: "success",
        message: "Post created successfully!",
        data: { postResponse },
    });
});
exports.CreatePost = CreatePost;
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield app_1.prismaClient.post.findMany({
        where: { userId: req.userId },
    });
    res.status(200).json({ status: "success", data: posts });
});
exports.getPost = getPost;
const getAllPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const where = req.isAdmin ? {} : { userId: req.userId };
    const posts = yield app_1.prismaClient.post.findMany({
        where,
        include: {
            categories: {
                include: {
                    category: true,
                },
            },
        },
    });
    res.status(200).json({ status: "success", data: posts });
});
exports.getAllPost = getAllPost;
const getPostByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield (0, category_1.getCategory)([req.params.name]);
    console.log("category", category);
    const posts = yield app_1.prismaClient.post.findMany({
        where: {
            userId: req.userId,
            categories: {
                some: {
                    categoryId: category[0].id,
                },
            },
        },
        include: {
            categories: {
                include: {
                    category: true,
                },
            },
        },
    });
    res.status(200).json({ status: "success", data: posts });
});
exports.getPostByCategory = getPostByCategory;
