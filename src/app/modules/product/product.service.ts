import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProductIntoDB = async (productData: TProduct) => {
    const result = await Product.create(productData);
    return result;
};

const getAllProductsFromDB = async (searchTerm: string) => {
    if (searchTerm) {
        const searchPattern = new RegExp(searchTerm, "i");
        return await Product.find({
            $or: [
                { name: searchPattern },
                { brand: searchPattern },
                { category: searchPattern },
            ],
        }).exec();
    } else {
        return await Product.find();
    }
};

const getProductByIdFromDB = async (id: string) => {
    const result = await Product.findById(id).exec();
    return result;
};

const updateProductIntoDB = async (
    productId: string,
    updateData: Partial<TProduct>
) => {
    const result = await Product.findByIdAndUpdate(productId, updateData, {
        new: true,
    }).exec();
    return result;
};

const deleteProductIntoDB = async (productId: string) => {
    const result = await Product.deleteOne({ _id: productId }).exec();
    return result;
};

export const ProductServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    getProductByIdFromDB,
    updateProductIntoDB,
    deleteProductIntoDB,
};
