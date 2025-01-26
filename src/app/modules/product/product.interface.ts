import { Model, Types } from "mongoose";
import { PRODUCT_CATEGORY, PRODUCT_STATUS } from "./product.constant";

export type TCategory = keyof typeof PRODUCT_CATEGORY;
export type TProductStatus = keyof typeof PRODUCT_STATUS;

export type TProduct = {
    name: string;
    brand: Types.ObjectId;
    model?: string;
    price: number;
    category: TCategory;
    description?: string;
    quantity: number;
    inStock: boolean;
    status: TProductStatus;
    isDeleted: boolean;
};

export interface ProductModal extends Model<TProduct> {
    isProductExist(productId: string): Promise<TProduct | null>;
}
