import express, { NextFunction, Request, Response } from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.post(
    "/create-user",
    auth(USER_ROLE.admin),
    validateRequest(UserValidation.createUserValidationSchema),
    UserControllers.createUser,
);

export const UserRoutes = router;
