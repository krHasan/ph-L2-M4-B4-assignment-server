import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import config from "../../config";
import { createToken, verifyToken } from "./auth.utils";
import { httpStatus } from "../../config/httpStatus";
import { USER_STATUS } from "../user/user.constant";

const loginUser = async (payload: TLoginUser) => {
    const user = await User.isUserExistsByEmail(payload?.email);
    if (!user || user?.isDeleted || user?.status === USER_STATUS.blocked) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    const isPasswordMatched = await User.isPasswordMatched(
        payload?.password,
        user.password,
    );

    if (!isPasswordMatched) {
        throw new AppError(httpStatus.FORBIDDEN, "Password didn't not matched");
    }

    const jwtPayload = {
        userEmail: user.email,
        role: user.role,
    };

    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string,
    );

    const refreshToken = createToken(
        jwtPayload,
        config.jwt_refresh_secret as string,
        config.jwt_refresh_expires_in as string,
    );

    return {
        accessToken,
        refreshToken,
    };
};

const refreshToken = async (token: string) => {
    const decoded = verifyToken(token, config.jwt_refresh_secret as string);

    const { userEmail, iat } = decoded;

    const user = await User.isUserExistsByEmail(userEmail);
    if (!user || user?.isDeleted || user?.status === USER_STATUS.blocked) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    const jwtPayload = {
        userEmail: user.email,
        role: user.role,
    };

    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string,
    );

    return {
        accessToken,
    };
};

export const AuthServices = {
    loginUser,
    refreshToken,
};
