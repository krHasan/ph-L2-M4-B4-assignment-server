import { JwtPayload } from "jsonwebtoken";
import { httpStatus } from "../../config/httpStatus";
import AppError from "../../errors/AppError";
import { Product } from "../product/product.model";
import { Order } from "./order.model";
import { TOrder } from "./order.interface";
import { orderUtils } from "./order.utils";
import { User } from "../user/user.model";

const createAnOrderIntoDB = async (
    payload: Partial<TOrder>,
    client_ip: string,
) => {
    const user = await User.find({
        email: payload.userEmail,
    });
    if (!payload?.products?.length)
        throw new AppError(httpStatus.NOT_ACCEPTABLE, "Order is not specified");

    const products = payload.products;

    let totalPrice = 0;
    const productDetails = await Promise.all(
        products.map(async (item) => {
            const product = await Product.findById(item.product);
            if (product) {
                const subtotal = product
                    ? (product.price || 0) * item.quantity
                    : 0;
                totalPrice += subtotal;
                return item;
            }
        }),
    );

    let order = await Order.create({
        userEmail: payload.userEmail,
        fullName: payload.fullName,
        mobile: payload.mobile,
        address: payload.address,
        products: productDetails,
        totalPrice,
    });

    console.log(user);

    // payment integration
    const shurjopayPayload = {
        amount: totalPrice,
        order_id: order._id,
        currency: "BDT",
        customer_name: user[0].name,
        customer_address: payload.address,
        customer_email: user[0].email,
        customer_phone: payload.mobile,
        customer_city: "Dhaka",
        client_ip,
    };

    const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

    if (payment?.transactionStatus) {
        order = await order.updateOne({
            transaction: {
                id: payment.sp_order_id,
                transactionStatus: payment.transactionStatus,
            },
        });
    }

    return payment.checkout_url;
};

const getAllOrdersFromDB = async (email: string) => {
    const res = await Order.find({
        userEmail: email,
    });

    return res;
};

const verifyPayment = async (order_id: string) => {
    const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

    if (verifiedPayment.length) {
        await Order.findOneAndUpdate(
            {
                "transaction.id": order_id,
            },
            {
                "transaction.bank_status": verifiedPayment[0].bank_status,
                "transaction.sp_code": verifiedPayment[0].sp_code,
                "transaction.sp_message": verifiedPayment[0].sp_message,
                "transaction.transactionStatus":
                    verifiedPayment[0].transaction_status,
                "transaction.method": verifiedPayment[0].method,
                "transaction.date_time": verifiedPayment[0].date_time,
                status:
                    verifiedPayment[0].bank_status == "Success"
                        ? "Paid"
                        : verifiedPayment[0].bank_status == "Failed"
                          ? "Pending"
                          : verifiedPayment[0].bank_status == "Cancel"
                            ? "Cancelled"
                            : "",
            },
        );
    }

    return verifiedPayment;
};

export const OrderServices = {
    createAnOrderIntoDB,
    verifyPayment,
    getAllOrdersFromDB,
};
