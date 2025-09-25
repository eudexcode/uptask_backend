import mongoose, { Schema, Document, Types } from "mongoose";

/* const userRole = {
    ADMIN: "ADMIN",
    USER: "USER"
} as const; */

/* export type UserRole = typeof userRole[keyof typeof userRole]; */

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
/*     role: string; */
    confirmed: boolean;
}

export const userSchema: Schema = new Schema({
    name: {
        type:String,
        required:true,
        trim:true
    },
    email: {
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true
    },
    password: {
        type: String,
        requiered: true,
    },
    confirmed: {
        type: Boolean,
        default: false
    }
/*     role: {
        type: String,
        enum: Object.values(userRole),
        default: userRole.USER
    } */
}, {
    timestamps: true
})

const User = mongoose.model<IUser>("User", userSchema);
export default User;