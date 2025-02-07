import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import config from "../../config";
import { createToken, verifyToken } from "./auth.utils";
import { httpStatus } from "../../config/httpStatus";
import { USER_STATUS } from "../user/user.constant";
import { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sendEmail } from "../../utils/sendEmail";

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
        throw new AppError(httpStatus.FORBIDDEN, "Password did not matched");
    }

    const jwtPayload = {
        useremail: user.email,
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

    const { useremail, iat } = decoded;

    const user = await User.isUserExistsByEmail(useremail);
    if (!user || user?.isDeleted || user?.status === USER_STATUS.blocked) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    const jwtPayload = {
        useremail: user.email,
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

const changePassword = async (
    userData: JwtPayload,
    payload: { oldPassword: string; newPassword: string },
) => {
    const user = await User.isUserExistsByEmail(userData?.useremail);
    if (!user || user?.isDeleted || user?.status === USER_STATUS.blocked) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    const isPasswordMatched = await User.isPasswordMatched(
        payload?.oldPassword,
        user?.password,
    );

    if (!isPasswordMatched) {
        throw new AppError(httpStatus.FORBIDDEN, "Password did not matched");
    }

    const newHashedPassword = await bcrypt.hash(
        payload?.newPassword,
        Number(config.bcrypt_salt_rounds),
    );

    await User.findOneAndUpdate(
        {
            email: userData.useremail,
            role: userData.role,
        },
        {
            password: newHashedPassword,
        },
    );

    return null;
};

const forgetPassword = async (userEmail: string) => {
    const user = await User.isUserExistsByEmail(userEmail);
    if (!user || user?.isDeleted || user?.status === USER_STATUS.blocked) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    const jwtPayload = {
        useremail: user.email,
        role: user.role,
    };

    const resetToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        "10m",
    );

    const resetUILink = `${config.frontend_link}/reset-password?email=${user.email}&token=${resetToken}`;

    sendEmail(user.email, resetUILink);
};

const resetPassword = async (
    payload: { email: string; newPassword: string },
    token: string,
) => {
    const user = await User.isUserExistsByEmail(payload.email);
    if (!user || user?.isDeleted || user?.status === USER_STATUS.blocked) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    const decoded = verifyToken(token, config.jwt_access_secret as string);

    if (payload.email !== decoded.useremail) {
        throw new AppError(httpStatus.FORBIDDEN, "You are forbidden");
    }

    const newHashedPassword = await bcrypt.hash(
        payload?.newPassword,
        Number(config.bcrypt_salt_rounds),
    );

    await User.findOneAndUpdate(
        {
            email: decoded.useremail,
            role: decoded.role,
        },
        {
            password: newHashedPassword,
        },
    );
};

export const AuthServices = {
    loginUser,
    refreshToken,
    changePassword,
    forgetPassword,
    resetPassword,
};
