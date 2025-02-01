import express, { NextFunction, Request, Response } from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";

const router = express.Router();

router.post(
    "/create-user",
    validateRequest(UserValidation.createUserValidationSchema),
    UserControllers.createUser,
);

router.get("/", auth(USER_ROLE.admin), UserControllers.getAllUsers);

router.get(
    "/admin-dashboard/count-summary",
    auth(USER_ROLE.admin),
    UserControllers.getCountSummary,
);

router.patch(
    "/change-status/:userId",
    auth(USER_ROLE.admin),
    UserControllers.changeUserStatus,
);

export const UserRoutes = router;
