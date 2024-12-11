
import mongoose from "mongoose";
import { Users } from "./users.interface";

const usersSchema = new mongoose.Schema<Users>({
    name: { type: String},
    userName: {type: String},
    password: {type: String},
    email: {type: String},
    role: {type: String, default: "user", enum: ["admin", "empolyee", "user"]},
    active: {type: Boolean, default: true},
    hasPassword: {type: Boolean, default: true},
    googleId: String,
    image: {type: String, default: "user-default.jpg"},
    passwordChangedAt:  Date,
    passwordResetCode: String,
    passwordResetCodeExpires: Date,
    passwordResetCodeverfiy: Boolean
}, { timestamps: true}) // this is schema only


const imageUrl = ( document: Users) => {
    if (document.image && document.image.startsWith('user')) document.image = `${process.env.BASE_URL}/images/users/${document.image}`;
}

usersSchema.post( 'init', imageUrl ).post( 'save', imageUrl);

export default mongoose.model<Users>("users", usersSchema)  // this is model used to handle schema "note!! <> is a generic types to know types of any thing"
