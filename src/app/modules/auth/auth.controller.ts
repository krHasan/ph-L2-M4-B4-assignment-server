import config from "../../config";
import { httpStatus } from "../../config/httpStatus";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUser(req.body);
    const { refreshToken, accessToken } = result;
    res.cookie("refreshToken", refreshToken, {
        secure: config.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User login successful",
        data: {
            accessToken,
        },
    });
});

const refreshToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    const result = await AuthServices.refreshToken(refreshToken);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Access token is created successfully",
        data: result,
    });
});

const changePassword = catchAsync(async (req, res) => {
    const { ...passwordData } = req.body;
    const result = await AuthServices.changePassword(req.user, passwordData);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Password has been changed successfully",
        data: result,
    });
});

const forgetPassword = catchAsync(async (req, res) => {
    const userEmail = req.body.email;
    const result = await AuthServices.forgetPassword(userEmail);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message:
            "Reset link is generated successfully, Please check your email",
        data: result,
    });
});

const resetPassword = catchAsync(async (req, res) => {
    const token = req.headers.authorization;
    const result = await AuthServices.resetPassword(req.body, token as string);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Password reset successful",
        data: result,
    });
});

export const AuthControllers = {
    loginUser,
    refreshToken,
    changePassword,
    forgetPassword,
    resetPassword,
};
