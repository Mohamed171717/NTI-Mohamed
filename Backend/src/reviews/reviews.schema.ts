
import mongoose from "mongoose";
import { Reviews } from "./reviews.interface";
import productsSchema from "../products/products.schema";

const ReviewsSchema = new mongoose.Schema<Reviews>({
    comment: String,
    rate: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users"},  // "required: true" is used to ensure that every review must have a user associated with it.
    product: { type: mongoose.Schema.Types.ObjectId, ref: "products"}  // "required: true" is used to ensure that every review must have a user associated with it.
}, { timestamps: true}) // this is schema only


ReviewsSchema.statics.calcRating = ( async function (productId) {
    const results = await this.aggregate([
        { $match: { product: productId } },
        { $group: { _id: "product", avgRating: { $avg: "$rate" }, ratingQuantity: {$sum: 1}} }
    ]);
    if(results.length > 0) {
        productsSchema.findByIdAndUpdate(productId, {
            rateAvg: results[0].avgRating,
            rating: results[0].ratingQuantity
        })
    } else {
        productsSchema.findByIdAndUpdate(productId, { rateAvg: 0, rating: 0})
    }
})

ReviewsSchema.post<Reviews>('save', async function () {
    await (this.constructor as any).calcRating(this.product);
})
ReviewsSchema.post<Reviews>('findOneAndUpdate', async function (doc: Reviews) {
    await (doc.constructor as any).calcRating(this.product);
})
ReviewsSchema.post<Reviews>('findOneAndDelete', async function (doc: Reviews) {
    await (doc.constructor as any).calcRating(this.product);
})

ReviewsSchema.pre<Reviews>(/^find/, function (next) {
    this.populate({path: "users", select: "name image" })
    next();
})

export default mongoose.model<Reviews>("reviews", ReviewsSchema)  // this is model used to handle schema "note!! <> is a generic types to know types of any thing"
