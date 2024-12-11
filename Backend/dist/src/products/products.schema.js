"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productsSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "categories" },
    subcategory: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "subcategories" },
    price: { type: Number, required: true },
    discount: { type: Number },
    priceAfterDiscount: { type: Number },
    quantity: { type: Number, default: 0 },
    sold: { type: Number, default: 0 },
    rateAvg: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    cover: String,
    images: [String]
}, { timestamps: true }); // this is schema only
productsSchema.pre(/^find/, function (next) {
    this.populate({ path: 'subcategory', select: 'name image' });
    next();
});
exports.default = mongoose_1.default.model("poducts", productsSchema); // this is model used to handle schema "note!! <> is a generic types to know types of any thing"
