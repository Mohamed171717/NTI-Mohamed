
import mongoose from "mongoose";
import { Products } from "./products.interface";


const productsSchema = new mongoose.Schema<Products>({
    name: { type: String, required: true, trim: true},
    description: { type: String, required: true, trim: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "categories"},
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: "subcategories"},
    price: { type: Number, required: true },
    discount: { type: Number },
    priceAfterDiscount: { type: Number },
    quantity: { type: Number, default: 0 },
    sold: { type: Number, default: 0 },
    rateAvg: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    cover: String,
    images: [String]
}, { timestamps: true}) // this is schema only

const imageUrl = ( document: Products) => {
    if (document.cover) document.cover = `${process.env.BASE_URL}/images/products/${document.cover}`;
    if (document.images) document.images = document.images.map((image) => `${process.env.BASE_URL}/images/products/${image}`);
}

productsSchema.post( 'init', imageUrl ).post( 'save', imageUrl);

productsSchema.pre<Products>( /^find/, function (next) {
    this.populate( {path: 'subcategory', select: 'name image'} )
    next();
})

export default mongoose.model<Products>("poducts", productsSchema)  // this is model used to handle schema "note!! <> is a generic types to know types of any thing"
