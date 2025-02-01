import express from "express";
import { OrderController } from "./order.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post("/", auth(USER_ROLE.customer), OrderController.createAnOrder);
router.get("/revenue", OrderController.calculateRevenue);

export const OrderRouters = router;
