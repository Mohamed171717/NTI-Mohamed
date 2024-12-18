
import mongoose from "mongoose";
import { Orders } from "./orders.interface";

const OrdersSchema = new mongoose.Schema<Orders>({
    items: [{
        product: {type: mongoose.Schema.Types.ObjectId, ref: 'products'},
        quantity: {type: Number, default: 1},
        price: Number
    }],
    payment: {type: String, enum: ['cash', 'card'], default: 'cash'},
    taxPrice: Number,
    itemsPrice: {type: Number},
    totalPrice: {type: Number},
    isDelivered: {type: Boolean, default: false},
    deliveredAt: {type: Date},
    isPaid: {type: Boolean, default: false},
    paidAt: {type: Date},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    address: {
        street: String,
        city: String,
        state: String,
        zip: String,
    }
}, { timestamps: true}) // this is schema only

OrdersSchema.pre<Orders>(/^find/, function (next) {
    this.populate({path: 'items.product', select: 'name cover'});
    this.populate({path: 'user', select: 'name image'});
    next();
});

export default mongoose.model<Orders>("orders", OrdersSchema)  // this is model used to handle schema "note!! <> is a generic types to know types of any thing"
