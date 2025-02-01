import { model, Schema } from "mongoose";
import { ProductModal, TProduct } from "./product.interface";
import {
    PRODUCT_STATUS,
    productCategoryArray,
    productStatusArray,
} from "./product.constant";

const productSchema = new Schema<TProduct, ProductModal>(
    {
        name: { type: String, required: true, maxlength: 255 },
        brand: {
            type: Schema.Types.ObjectId,
            ref: "Brand",
            required: true,
        },
        model: { type: String },
        price: { type: Number, required: true, default: 0.0 },
        category: {
            type: String,
            enum: productCategoryArray,
            required: true,
        },
        description: { type: String },
        quantity: { type: Number, required: true, min: 0, default: 0 },
        inStock: { type: Boolean, required: true },
        status: {
            type: String,
            enum: productStatusArray,
            default: PRODUCT_STATUS.active,
        },
        isDeleted: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    },
);

productSchema.pre("find", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

productSchema.pre("aggregate", function (next) {
    this.pipeline().unshift({
        $match: { isDeleted: { $ne: true } },
    });
    next();
});

productSchema.pre("findOne", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

productSchema.statics.isProductExist = async function (
    productId: string,
): Promise<TProduct | null> {
    return this.findById(productId);
};

export const Product = model<TProduct, ProductModal>("Product", productSchema);
