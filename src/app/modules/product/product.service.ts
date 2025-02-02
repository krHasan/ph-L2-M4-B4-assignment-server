import QueryBuilder from "../../builder/QueryBuilder";
import { httpStatus } from "../../config/httpStatus";
import AppError from "../../errors/AppError";
import { Brand } from "../brand/brand.model";
import { PRODUCT_STATUS, productSearchableFields } from "./product.constant";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProductIntoDB = async (productData: TProduct) => {
    const brand = await Brand.isBrandExists(String(productData.brand));
    if (!brand) {
        throw new AppError(httpStatus.NOT_FOUND, "Brand not found");
    }

    productData.brandName = brand.name;
    productData.inStock = productData.quantity > 0;

    try {
        const result = (await Product.create(productData)).populate("brand");
        return result;
    } catch (error) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to add bike data");
    }
};

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
    try {
        const productQuery = new QueryBuilder(
            Product.find().populate("brand"),
            query,
        )
            .search(productSearchableFields)
            .filter()
            .sort()
            .paginate()
            .fields();

        const result = await productQuery.modelQuery;
        const metaData = await productQuery.getMetaData();

        return { result, metaData };
    } catch (error) {
        throw new AppError(
            httpStatus.INTERNAL_SERVER_ERROR,
            "Failed to retrieve bike list",
        );
    }
};

const getProductByIdFromDB = async (id: string) => {
    try {
        const isProductExist = await Product.isProductExist(id);
        if (!isProductExist) {
            throw new AppError(
                httpStatus.NOT_FOUND,
                "Bike data is not found with provided ID",
            );
        }
        const result = await Product.findById(id).populate("brand").exec();
        return result;
    } catch (error) {
        throw new AppError(
            httpStatus.NOT_FOUND,
            "Bike data is not found with provided ID",
        );
    }
};

const updateProductIntoDB = async (
    productId: string,
    updateData: Partial<TProduct>,
) => {
    try {
        if (updateData.brand) {
            const brand = await Brand.isBrandExists(String(updateData.brand));
            if (!brand) {
                throw new AppError(httpStatus.NOT_FOUND, "Brand not found");
            }
            updateData.brandName = brand.name;
        }

        const isProductExist = await Product.isProductExist(productId);
        if (!isProductExist) {
            throw new AppError(
                httpStatus.NOT_FOUND,
                "Bike data is not found with provided ID",
            );
        }
        if (updateData?.quantity || updateData?.quantity === 0) {
            updateData.inStock = updateData.quantity > 0;
        }
        const result = await Product.findByIdAndUpdate(productId, updateData, {
            new: true,
        })
            .populate("brand")
            .exec();
        return result;
    } catch (error) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "Failed to update bike data",
        );
    }
};

const deleteProductIntoDB = async (productId: string) => {
    try {
        const isProductExist = await Product.isProductExist(productId);
        if (!isProductExist) {
            throw new AppError(
                httpStatus.NOT_FOUND,
                "Bike data is not found with provided ID",
            );
        }
        const result = await Product.findByIdAndUpdate(
            productId,
            { isDeleted: true, status: PRODUCT_STATUS.inactive },
            { new: true },
        );
        return result;
    } catch (error) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "Failed to delete bike data",
        );
    }
};

export const ProductServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    getProductByIdFromDB,
    updateProductIntoDB,
    deleteProductIntoDB,
};
