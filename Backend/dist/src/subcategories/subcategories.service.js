"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const subcategories_schema_1 = __importDefault(require("./subcategories.schema"));
const refactor_service_1 = __importDefault(require("../refactor.service"));
class SubcategoriesService {
    constructor() {
        this.getAllSubcategories = refactor_service_1.default.getAll(subcategories_schema_1.default);
        this.createSubcategory = refactor_service_1.default.createOne(subcategories_schema_1.default);
        this.getSubcategory = refactor_service_1.default.getOne(subcategories_schema_1.default);
        this.updateSubcategory = refactor_service_1.default.updateOne(subcategories_schema_1.default);
        this.deleteSubcategory = refactor_service_1.default.deleteOne(subcategories_schema_1.default);
    }
    setCategoryId(req, res, next) {
        if (req.params.categoryId && !req.body.category)
            req.body.category = req.params.categoryId;
        next();
    }
    filterSubcategories(req, res, next) {
        const filterData = {};
        if (req.params.categoryId)
            filterData.category = req.params.categoryId;
        req.filterData = filterData;
        next();
    }
}
const subcategoriesService = new SubcategoriesService();
exports.default = subcategoriesService;
