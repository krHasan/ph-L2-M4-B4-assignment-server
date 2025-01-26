import { model, Schema } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";
import {
    USER_ROLE,
    USER_STATUS,
    userRoleArray,
    userStatusArray,
} from "./user.constant";

const userSchema = new Schema<TUser, UserModel>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            select: 0,
        },
        role: {
            type: String,
            enum: userRoleArray,
            default: USER_ROLE.customer,
        },
        status: {
            type: String,
            enum: userStatusArray,
            default: USER_STATUS.active,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

//pre save middleware
userSchema.pre("save", async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds),
    );
    next();
});

//post save middleware
userSchema.post("save", function (doc, next) {
    doc.password = "";
    next();
});

userSchema.statics.isUserExistsByEmail = async function (email: string) {
    return await User.findOne({
        email,
    }).select("+password");
};

userSchema.statics.isPasswordMatched = async function (
    plainTextPassword: string,
    hashedPassword: string,
) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<TUser, UserModel>("User", userSchema);
