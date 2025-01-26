import { Request, Response } from "express";
import productValidationSchema, {
    productUpdateValidationSchema,
} from "./product.validation";
import { ProductServices } from "./product.service";

const createProduct = async (req: Request, res: Response) => {
    try {
        const product = req.body;
        const validatedProductData = productValidationSchema.parse(product);
        const result = await ProductServices.createProductIntoDB(
            validatedProductData
        );
        res.status(200).json({
            message: "Bike created successfully",
            success: true,
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            message: error.message || "Something went wrong",
            success: false,
            error: error,
            stack: error.stack,
        });
    }
};

const getAllProducts = async (req: Request, res: Response) => {
    try {
        const searchTerm = req.query?.searchTerm;
        const result = await ProductServices.getAllProductsFromDB(
            searchTerm as string
        );
        res.status(200).json({
            message: "Bikes retrieved successfully",
            success: true,
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            message: error.message || "Something went wrong",
            success: false,
            error: error,
            stack: error.stack,
        });
    }
};

const getProductById = async (req: Request, res: Response) => {
    try {
        const productId = req.params?.productId;
        const result = await ProductServices.getProductByIdFromDB(productId);
        if (result) {
            res.status(200).json({
                message: "Bike retrieved successfully",
                success: true,
                data: result,
            });
        } else {
            res.status(200).json({
                message: "Bike is not found",
                success: false,
                data: {},
            });
        }
    } catch (error: any) {
        res.status(500).json({
            message: error.message || "Something went wrong",
            success: false,
            error: error,
            stack: error.stack,
        });
    }
};

const updateProduct = async (req: Request, res: Response) => {
    try {
        const productData = req.body;
        const productId = req.params?.productId;
        const data = productUpdateValidationSchema.parse(productData);
        const result = await ProductServices.updateProductIntoDB(
            productId,
            data
        );
        if (result) {
            res.status(200).json({
                message: "Bike updated successfully",
                success: true,
                data: result,
            });
        } else {
            res.status(200).json({
                message: "No data found to update",
                success: false,
                data: {},
            });
        }
    } catch (error: any) {
        res.status(500).json({
            message: error.message || "Something went wrong",
            success: false,
            error: error,
            stack: error.stack,
        });
    }
};

const deleteProductById = async (req: Request, res: Response) => {
    try {
        const productId = req.params?.productId;
        const result = await ProductServices.deleteProductIntoDB(productId);
        if (result.deletedCount > 0) {
            res.status(200).json({
                message: "Bike deleted successfully",
                success: true,
                data: {},
            });
        } else {
            res.status(200).json({
                message: "Bike is not deleted",
                success: false,
                data: result,
            });
        }
    } catch (error: any) {
        res.status(500).json({
            message: error.message || "Something went wrong",
            success: false,
            error: error,
            stack: error.stack,
        });
    }
};

export const ProductControllers = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProductById,
};
