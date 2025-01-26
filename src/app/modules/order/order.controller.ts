import { Request, Response } from "express";
import { OrderServices } from "./order.service";
import orderValidatedSchema from "./order.validation";

const createAnOrder = async (req: Request, res: Response) => {
    try {
        const orderData = req.body;
        const data = orderValidatedSchema.parse(orderData);
        const result = await OrderServices.createAnOrderIntoDB(data);
        res.status(200).json({
            message: "Order created successfully",
            success: true,
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            message: error.message || "Something went wrong",
            success: false,
            error: error,
            stack: error.stack,
        });
    }
};

const calculateRevenue = async (req: Request, res: Response) => {
    try {
        const result = await OrderServices.calculateRevenue();
        res.status(200).json({
            message: "Revenue calculated successfully",
            success: true,
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            message: error.message || "Something went wrong",
            success: false,
            error: error,
            stack: error.stack,
        });
    }
};

export const OrderController = {
    createAnOrder,
    calculateRevenue,
};
