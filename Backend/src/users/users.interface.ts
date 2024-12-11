
import { Document } from "mongoose";

export interface Users extends Document{
    userName: string;
    name: string;
    password: string;
    role: Role;
    active: boolean;
    googleId: string;
    hasPassword: boolean;
    passwordChangedAt: Date | number;
    passwordResetCode: string | undefined;
    passwordResetCodeExpires: Date | number | undefined;
    passwordResetCodeverfiy: boolean | undefined;
    email: string;
    image: string
}

type Role =  "admin" | "employee" | "user"