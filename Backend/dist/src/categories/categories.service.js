"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categories_schema_1 = __importDefault(require("./categories.schema"));
const refactor_service_1 = __importDefault(require("../refactor.service"));
class CategoriesService {
    constructor() {
        this.getAllCategories = refactor_service_1.default.getAll(categories_schema_1.default);
        this.createCategory = refactor_service_1.default.createOne(categories_schema_1.default);
        this.getCategory = refactor_service_1.default.getOne(categories_schema_1.default);
        this.updateCategory = refactor_service_1.default.updateOne(categories_schema_1.default);
        this.deleteCategory = refactor_service_1.default.deleteOne(categories_schema_1.default);
    }
}
const categoriesService = new CategoriesService();
exports.default = categoriesService;
// or you can use export default new CategoriesService;
