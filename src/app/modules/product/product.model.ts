import { model, Schema } from "mongoose";
import { TProduct } from "./product.interface";

const productSchema = new Schema<TProduct>(
    {
        name: { type: String, required: true, maxlength: 255 },
        brand: { type: String, required: true },
        price: { type: Number, required: true },
        category: {
            type: String,
            enum: ["Mountain", "Road", "Hybrid", "Electric"],
            required: true,
        },
        description: { type: String, required: true },
        quantity: { type: Number, required: true, min: 0 },
        inStock: { type: Boolean, default: true },
    },
    {
        timestamps: true,
    }
);

export const Product = model<TProduct>("Product", productSchema);
