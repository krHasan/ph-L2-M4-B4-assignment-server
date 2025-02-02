import { model, Schema } from "mongoose";
import { BrandModel, TBrand } from "./brand.interface";

const brandSchema = new Schema<TBrand, BrandModel>({
    name: {
        type: String,
        required: true,
    },
    iconUrl: {
        type: String,
    },
});

brandSchema.statics.isBrandExists = async function (
    brandId: string,
): Promise<TBrand | null> {
    return this.findById(brandId);
};

export const Brand = model<TBrand, BrandModel>("Brand", brandSchema);
