import { Product } from "../product/product.model";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";

const createAnOrderIntoDB = async (orderData: TOrder) => {
    const session = await Order.startSession();
    session.startTransaction();
    try {
        //first find the product
        const product = await Product.findById(orderData.product).session(
            session
        );

        //checking whether the product is available or not
        if (!product) {
            throw new Error("Product not found");
        }

        //checking the stock
        if (product.quantity < orderData.quantity) {
            throw new Error("Insufficient quantity available in inventory");
        }

        //updating the quantity
        product.quantity -= orderData.quantity;
        product.inStock = product.quantity > 0;
        await product.save({ session });

        const order = new Order(orderData);
        await order.save({ session });

        await session.commitTransaction();
        return order;
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
};

const calculateRevenue = async () => {
    const result = await Order.aggregate([
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: "$totalPrice" },
            },
        },
        {
            $project: {
                _id: 0,
                totalRevenue: 1,
            },
        },
    ]);

    return result;
};

export const OrderServices = {
    createAnOrderIntoDB,
    calculateRevenue,
};
