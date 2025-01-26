import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidations } from "./auth.validation";
import { AuthControllers } from "./auth.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
    "/login",
    validateRequest(AuthValidations.loginValidationSchema),
    AuthControllers.loginUser,
);

router.post(
    "/refresh-token",
    validateRequest(AuthValidations.refreshTokenValidationSchema),
    AuthControllers.refreshToken,
);

export const AuthRoutes = router;
