"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const subcategoriesSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, trim: true },
    category: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "categories" },
    image: String
}, { timestamps: true }); // this is schema only
subcategoriesSchema.pre(/^find/, function (next) {
    this.populate({ path: 'category', select: 'name image' }); // -_id
    next();
});
exports.default = mongoose_1.default.model("subcategories", subcategoriesSchema); // this is model used to handle schema "note!! <> is a generic types to know types of any thing"
