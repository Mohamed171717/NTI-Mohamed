"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CategoriesSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    image: String
}, { timestamps: true }); // this is schema only
exports.default = mongoose_1.default.model("categories", CategoriesSchema); // this is model used to handle schema "note!! <> is a generic types to know types of any thing"
