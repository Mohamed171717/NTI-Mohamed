
import { Document, Schema } from "mongoose";

export interface Users extends Document{
    userName: string;
    name: string;
    password: string;
    role: Role;
    active: boolean;
    googleId: string;
    hasPassword: boolean;
    wishlist: Schema.Types.ObjectId [];
    address: Address[];
    passwordChangedAt: Date | number;
    passwordResetCode: string | undefined;
    passwordResetCodeExpires: Date | number | undefined;
    passwordResetCodeVerfiy: boolean | undefined;
    email: string;
    image: string | undefined;
}

type Role =  "admin" | "employee" | "user"

export type Address = {
    street: string;
    city: string;
    state: string;
    zipCode: string;
}
