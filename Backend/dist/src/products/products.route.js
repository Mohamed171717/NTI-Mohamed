"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_service_1 = __importDefault(require("./products.service"));
const products_validation_1 = __importDefault(require("./products.validation"));
const productsRouter = (0, express_1.Router)();
productsRouter.route('/')
    .get(products_service_1.default.getAllProducts)
    .post(products_validation_1.default.createOne, products_service_1.default.createProducts);
productsRouter.route('/:id')
    .get(products_validation_1.default.getOne, products_service_1.default.getProducts)
    .put(products_validation_1.default.updateOne, products_service_1.default.updateProducts)
    .delete(products_validation_1.default.deleteOne, products_service_1.default.deleteProducts);
exports.default = productsRouter;
