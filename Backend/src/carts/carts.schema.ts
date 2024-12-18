
import mongoose from "mongoose";
import { Carts } from "./carts.interface";

const CartsSchema = new mongoose.Schema<Carts>({
    items: [{ 
        product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
        quantity: {type: Number, default: 1},
        taxPrice: Number,
        price: Number,
    }],
    totalPrice: {type: Number},
    totalPriceAfterDiscount: {type: Number},
    user: {type: mongoose.Schema.Types.ObjectId, ref: "users"}

}, { timestamps: true}) // this is schema only

CartsSchema.pre<Carts>( /^find/, function (next) {
    this.populate( {path: 'items.product', select: 'name cover'} )  // -_id
    next();
})


export default mongoose.model<Carts>("carts", CartsSchema)  // this is model used to handle schema "note!! <> is a generic types to know types of any thing"
