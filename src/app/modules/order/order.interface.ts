import { Types } from "mongoose";

export type TOrder = {
    email: string;
    product: Types.ObjectId | string;
    quantity: number;
    totalPrice: number;
};
