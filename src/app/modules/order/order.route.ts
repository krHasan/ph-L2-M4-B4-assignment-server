import express from "express";
import { OrderController } from "./order.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
    "/create-order",
    auth(USER_ROLE.customer),
    OrderController.createAnOrder,
);
router.get("/verify", OrderController.verifyPayment);
router.get("/:userEmail", OrderController.getAllOrders);

export const OrderRouters = router;
