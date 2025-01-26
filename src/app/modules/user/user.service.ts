/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import AppError from "../../errors/AppError";
import { httpStatus } from "../../config/httpStatus";

const createUserIntoDB = async (userData: Partial<TUser>) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const newUser = await User.create([userData], { session });

        if (!newUser.length) {
            throw new AppError(400, "Failed to create user");
        }
        await session.commitTransaction();
        await session.endSession();

        return newUser;
    } catch (error: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
};

export const UserServices = {
    createUserIntoDB,
};
