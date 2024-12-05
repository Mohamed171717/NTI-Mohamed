
import mongoose from "mongoose";
import { Categories } from "./categories.interface";

const CategoriesSchema = new mongoose.Schema<Categories>({
    name: { type: String, required: true, unique: true, trim: true},
    image: String
}, { timestamps: true}) // this is schema only

export default mongoose.model<Categories>("Categories", CategoriesSchema)  // this is model used to handle schema "note!! <> is a generic types to know types of any thing"
