
import { Document, Schema} from "mongoose";
import { Users } from "../users/users.interface";
import { Products } from "../products/products.interface";

export interface Carts extends Document{
    items: CartItems[];
    totalPrice: number;
    taxPrice: number;
    totalPriceAfterDiscount: number | undefined;
    user: Users;
}


export interface CartItems {
    _id: Schema.Types.ObjectId;
    product: Products;
    quantity: number;
    price: number;
}
