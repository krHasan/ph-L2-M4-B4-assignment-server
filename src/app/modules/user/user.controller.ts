import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { httpStatus } from "../../config/httpStatus";

const createUser = catchAsync(async (req, res) => {
    const result = await UserServices.createUserIntoDB(req.body);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User is created successfully",
        data: result,
    });
});

const getAllUsers = catchAsync(async (req, res) => {
    const result = await UserServices.getAllUserFromDB(req.query);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User list is retrieved successfully",
        meta: result.meta,
        data: result.result,
    });
});

const getCountSummary = catchAsync(async (req, res) => {
    const result = await UserServices.getCountSummaryFromDB();
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Count summary info retrieved successfully",
        data: result,
    });
});

const changeUserStatus = catchAsync(async (req, res) => {
    const result = await UserServices.changeUserStatusIntoDB(
        req.params.userId,
        req.body,
    );
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User status is changed successfully",
        data: result,
    });
});

const changeUserRole = catchAsync(async (req, res) => {
    const result = await UserServices.changeUserRoleIntoDB(
        req.params.userId,
        req.body,
    );
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User role is changed successfully",
        data: result,
    });
});

const getMe = catchAsync(async (req, res) => {
    const user = req.user;
    const result = await UserServices.getMe(user);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Data retrieved successfully",
        data: result,
    });
});

export const UserControllers = {
    createUser,
    getAllUsers,
    getCountSummary,
    changeUserStatus,
    changeUserRole,
    getMe,
};
