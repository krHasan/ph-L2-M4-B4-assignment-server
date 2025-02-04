import { Request, Response } from "express";
import { OrderServices } from "./order.service";

const createAnOrder = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        const result = await OrderServices.createAnOrderIntoDB(
            req.body,
            req.ip!,
        );
        console.log(result);
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

const getAllOrders = async (req: Request, res: Response) => {
    try {
        const order = await OrderServices.getAllOrdersFromDB(
            req.params.userEmail,
        );
        res.status(200).json({
            message: "Order data get successfully",
            success: true,
            data: order,
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

const verifyPayment = async (req: Request, res: Response) => {
    try {
        const order = await OrderServices.verifyPayment(
            req.query.order_id as string,
        );
        res.status(200).json({
            message: "Order verified successfully",
            success: true,
            data: order,
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
    verifyPayment,
    getAllOrders,
};
