import { model, Schema } from "mongoose";
import { TBrand } from "./brand.interface";

const brandSchema = new Schema<TBrand>({
    name: {
        type: String,
        required: true,
    },
    iconUrl: {
        type: String,
    },
});

export const Brand = model<TBrand>("Brand", brandSchema);
