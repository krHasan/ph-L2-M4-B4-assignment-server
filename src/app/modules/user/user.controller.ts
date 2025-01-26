import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const createUser = catchAsync(async (req, res) => {
    const result = await UserServices.createUserIntoDB(req.body);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "User is created successfully",
        data: result,
    });
});

export const UserControllers = {
    createUser,
};
