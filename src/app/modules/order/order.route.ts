import express from "express";
import { OrderController } from "./order.controller";

const router = express.Router();

router.post("/", OrderController.createAnOrder);
router.get("/revenue", OrderController.calculateRevenue);

export const OrderRouters = router;
