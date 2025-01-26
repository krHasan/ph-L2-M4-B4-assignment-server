import { model, Schema } from "mongoose";
import { TOrder } from "./order.interface";

const orderSchema = new Schema<TOrder>(
    {
        email: {
            type: String,
            required: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
        totalPrice: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    {
        timestamps: true,
    }
);

export const Order = model<TOrder>("Order", orderSchema);
