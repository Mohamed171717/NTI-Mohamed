"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subcategories_service_1 = __importDefault(require("./subcategories.service"));
const subcategories_validation_1 = __importDefault(require("./subcategories.validation"));
const subcategoriesRouter = (0, express_1.Router)({ mergeParams: true });
subcategoriesRouter.route('/')
    .get(subcategories_service_1.default.filterSubcategories, subcategories_service_1.default.getAllSubcategories)
    .post(subcategories_service_1.default.setCategoryId, subcategories_validation_1.default.createOne, subcategories_service_1.default.createSubcategory);
subcategoriesRouter.route('/:id')
    .get(subcategories_validation_1.default.getOne, subcategories_service_1.default.getSubcategory)
    .put(subcategories_validation_1.default.updateOne, subcategories_service_1.default.updateSubcategory)
    .delete(subcategories_validation_1.default.deleteOne, subcategories_service_1.default.deleteSubcategory);
exports.default = subcategoriesRouter;
