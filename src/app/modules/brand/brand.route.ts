import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BrandValidation } from "./brand.validation";
import { BrandController } from "./brand.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
    "/create-brand",
    auth(USER_ROLE.admin),
    validateRequest(BrandValidation.createBrandValidationSchema),
    BrandController.addBrand,
);
router.get("/", auth(USER_ROLE.admin), BrandController.getAllBrands);

export const BrandRoutes = router;
