import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";
import { httpStatus } from "../config/httpStatus";
import { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TUserRole } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import { verifyToken } from "../modules/auth/auth.utils";
import { USER_STATUS } from "../modules/user/user.constant";
import catchAsync from "../utils/catchAsync";

const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            const token = req.headers.authorization;
            if (!token) {
                throw new AppError(
                    httpStatus.UNAUTHORIZED,
                    "You are not authorized",
                );
            }

            const decoded = verifyToken(
                token,
                config.jwt_access_secret as string,
            );

            const { role, useremail, iat } = decoded;

            const user = await User.isUserExistsByEmail(useremail);
            if (
                !user ||
                user?.isDeleted ||
                user?.status === USER_STATUS.blocked
            ) {
                throw new AppError(httpStatus.NOT_FOUND, "User not found");
            }

            if (requiredRoles?.length && !requiredRoles.includes(role)) {
                throw new AppError(
                    httpStatus.UNAUTHORIZED,
                    "You are not authorized",
                );
            }

            req.user = decoded as JwtPayload;
            return next();
        },
    );
};

export default auth;
