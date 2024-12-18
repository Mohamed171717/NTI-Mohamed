
import mongoose from "mongoose";
import { Coupons } from "./coupons.interface";

const CouponsSchema = new mongoose.Schema<Coupons>({
    name: { type: String },
    discount: { type: Number },
    expireTime: { type: Date },
}, { timestamps: true}) // this is schema only

export default mongoose.model<Coupons>("coupons", CouponsSchema)  // this is model used to handle schema "note!! <> is a generic types to know types of any thing"
