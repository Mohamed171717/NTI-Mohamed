
import mongoose from "mongoose";
import { Users } from "./users.interface";
import bcrypt from "bcryptjs";

const usersSchema = new mongoose.Schema<Users>({
    name: { type: String},
    userName: {type: String},
    password: {type: String},
    email: {type: String},
    role: {type: String, default: "user", enum: ["admin", "empolyee", "user"]},
    active: {type: Boolean, default: true},
    hasPassword: {type: Boolean, default: true},
    image: {type: String, default: "user-default.jpg"},
    googleId: String,
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "products"}],
    address: [{ 
        street: String,
        city: String,
        state: String,
        zipCode: String,
    }],
    passwordChangedAt:  Date,
    passwordResetCode: String,
    passwordResetCodeExpires: Date,
    passwordResetCodeVerfiy: Boolean
}, { timestamps: true}) // this is schema only


const imageUrl = ( document: Users) => {
    if (document.image && document.image.startsWith('user')) document.image = `${process.env.BASE_URL}/images/users/${document.image}`;
}

usersSchema.post( 'init', imageUrl ).post( 'save', imageUrl);

usersSchema.pre<Users>('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 13);
    next();
})

export default mongoose.model<Users>("users", usersSchema)  // this is model used to handle schema "note!! <> is a generic types to know types of any thing"
