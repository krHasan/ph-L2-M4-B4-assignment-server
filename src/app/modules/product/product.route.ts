import express from "express";
import { ProductControllers } from "./product.controller";
import validateRequest from "../../middlewares/validateRequest";
import { ProductValidation } from "./product.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
    "/create-product",
    auth(USER_ROLE.admin),
    validateRequest(ProductValidation.createProductValidationSchema),
    ProductControllers.createProduct,
);
router.get("/", ProductControllers.getAllProducts);
router.get("/:productId", ProductControllers.getProductById);
router.patch("/:productId", ProductControllers.updateProduct);
router.delete("/:productId", ProductControllers.deleteProductById);

export const ProductRoutes = router;
