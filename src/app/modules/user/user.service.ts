/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import AppError from "../../errors/AppError";
import { httpStatus } from "../../config/httpStatus";
import { Order } from "../order/order.model";
import { Product } from "../product/product.model";
import { PRODUCT_STATUS } from "../product/product.constant";
import QueryBuilder from "../../builder/QueryBuilder";
import { JwtPayload } from "jsonwebtoken";
import { USER_ROLE } from "./user.constant";

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

const getAllUserFromDB = async (query: Record<string, unknown>) => {
    try {
        const userQuery = new QueryBuilder(User.find(), query)
            .search(["name", "email"])
            .filter()
            .sort()
            .paginate()
            .fields();
        const result = await userQuery.modelQuery;
        const meta = await userQuery.getMetaData();

        return { result, meta };
    } catch (error) {
        throw new AppError(
            httpStatus.INTERNAL_SERVER_ERROR,
            "Failed to retrieve user list",
        );
    }
};

const getCountSummaryFromDB = async () => {
    try {
        const totalUsers = await User.countDocuments({
            isDeleted: false,
        });

        const totalProductsList = await Product.find({
            isDeleted: false,
            inStock: true,
            status: PRODUCT_STATUS.active,
        });

        const totalOrders = await Order.estimatedDocumentCount();

        const totalProducts = totalProductsList.reduce(
            (acc, item) => acc + item.quantity,
            0,
        );

        return {
            totalUsers,
            totalProducts,
            totalOrders,
        };
    } catch (error: any) {
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
};

const changeUserStatusIntoDB = async (
    id: string,
    payload: Record<string, unknown>,
) => {
    try {
        const result = await User.findByIdAndUpdate({ _id: id }, payload, {
            new: true,
        });

        return result;
    } catch (error: any) {
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
};

const changeUserRoleIntoDB = async (
    id: string,
    payload: Record<string, unknown>,
) => {
    try {
        const result = await User.findByIdAndUpdate({ _id: id }, payload, {
            new: true,
        });

        return result;
    } catch (error: any) {
        throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
};

const getMe = async (decoded: JwtPayload) => {
    const { useremail } = decoded;
    let result = await User.findOne({ email: useremail });
    return result;
};

export const UserServices = {
    createUserIntoDB,
    getCountSummaryFromDB,
    getAllUserFromDB,
    changeUserStatusIntoDB,
    changeUserRoleIntoDB,
    getMe,
};
