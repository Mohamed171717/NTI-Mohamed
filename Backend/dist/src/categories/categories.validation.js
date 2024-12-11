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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_middleware_1 = __importDefault(require("../middlewares/validator.middleware"));
const categories_schema_1 = __importDefault(require("./categories.schema"));
const express_validator_1 = require("express-validator");
class CategoriesValidation {
    constructor() {
        this.createOne = [(0, express_validator_1.body)("name").notEmpty()
                .withMessage((val, { req }) => req.__("validation_field"))
                .isLength({ min: 2, max: 50 })
                .withMessage((val, { req }) => req.__('validation_length_short'))
                .custom((val_1, _a) => __awaiter(this, [val_1, _a], void 0, function* (val, { req }) {
                const category = yield categories_schema_1.default.findOne({ name: val });
                if (category)
                    throw new Error(`${req.__('validation_value')}`);
                return true;
            })), validator_middleware_1.default];
        this.updateOne = [(0, express_validator_1.param)("id").isMongoId().withMessage((val, { req }) => req.__('invalid_id')),
            (0, express_validator_1.body)("name").optional()
                .isLength({ min: 2, max: 50 })
                .withMessage((val, { req }) => req.__('validation_length_short'))
                .custom((val_1, _a) => __awaiter(this, [val_1, _a], void 0, function* (val, { req }) {
                var _b;
                const category = yield categories_schema_1.default.findOne({ name: val });
                if (category && category._id.toString() !== ((_b = req.params) === null || _b === void 0 ? void 0 : _b.id.toString()))
                    throw new Error(`${req.__('validation_value')}`);
                return true;
            })), validator_middleware_1.default];
        this.deleteOne = [
            (0, express_validator_1.param)("id").isMongoId().withMessage((val, { req }) => req.__('invalid_id')),
            validator_middleware_1.default
        ];
        this.getOne = [
            (0, express_validator_1.param)("id").isMongoId().withMessage((val, { req }) => req.__('invalid_id')),
            validator_middleware_1.default
        ];
    }
}
const categoriesValidation = new CategoriesValidation();
exports.default = categoriesValidation;
