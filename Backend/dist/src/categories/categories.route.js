"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categories_service_1 = __importDefault(require("./categories.service"));
const subcategories_route_1 = __importDefault(require("../subcategories/subcategories.route"));
const categories_validation_1 = __importDefault(require("./categories.validation"));
const categoriesRouter = (0, express_1.Router)();
// /api/v1/categories/:categoryid/subcategories
categoriesRouter.use("/:categoryId/subcategories", subcategories_route_1.default);
categoriesRouter.route('/')
    .get(categories_service_1.default.getAllCategories)
    .post(categories_validation_1.default.createOne, categories_service_1.default.createCategory);
categoriesRouter.route('/:id')
    .get(categories_validation_1.default.getOne, categories_service_1.default.getCategory)
    .put(categories_validation_1.default.updateOne, categories_service_1.default.updateCategory)
    .delete(categories_validation_1.default.deleteOne, categories_service_1.default.deleteCategory);
exports.default = categoriesRouter;
