/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE, USER_STATUS } from "./user.constant";

export type TUserRole = keyof typeof USER_ROLE;
export type TUserStatus = keyof typeof USER_STATUS;

export interface TUser {
    name: string;
    email: string;
    password: string;
    role: TUserRole;
    status: TUserStatus;
    isDeleted: boolean;
}

export interface UserModel extends Model<TUser> {
    isUserExistsByEmail(email: string): Promise<TUser>;
    isPasswordMatched(
        plainTextPassword: string,
        hashedPassword: string,
    ): Promise<boolean>;
}
