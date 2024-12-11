"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_schema_1 = __importDefault(require("./products.schema"));
const refactor_service_1 = __importDefault(require("../refactor.service"));
class ProductsService {
    constructor() {
        this.getAllProducts = refactor_service_1.default.getAll(products_schema_1.default);
        this.createProducts = refactor_service_1.default.createOne(products_schema_1.default);
        this.getProducts = refactor_service_1.default.getOne(products_schema_1.default);
        this.updateProducts = refactor_service_1.default.updateOne(products_schema_1.default);
        this.deleteProducts = refactor_service_1.default.deleteOne(products_schema_1.default);
    }
}
const productsService = new ProductsService();
exports.default = productsService;
