import { TBrand } from "./brand.interface";
import { Brand } from "./brand.model";

const addBrandIntoDB = async (payload: TBrand[]) => {
    const result = await Brand.create(payload);
    return result;
};

const getAllBrandsFromDB = async () => {
    const result = await Brand.find();
    return result;
};

export const BrandServices = {
    addBrandIntoDB,
    getAllBrandsFromDB,
};
