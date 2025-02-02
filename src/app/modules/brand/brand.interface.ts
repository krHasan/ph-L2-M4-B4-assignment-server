import { Model } from "mongoose";

export type TBrand = {
    name: string;
    iconUrl?: string;
};

export interface BrandModel extends Model<TBrand> {
    isBrandExists(brandId: string): Promise<TBrand | null>;
}
