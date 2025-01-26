import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const createProduct = catchAsync(async (req, res) => {
    const result = await ProductServices.createProductIntoDB(req.body);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Bike is added successfully",
        data: result,
    });
});

const getAllProducts = async (req: Request, res: Response) => {
    const result = await ProductServices.getAllProductsFromDB(req.query);
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Bike list is retrieved successfully",
        data: result.result,
        meta: result.metaData,
    });
};

const getProductById = async (req: Request, res: Response) => {
    const result = await ProductServices.getProductByIdFromDB(
        req.params.productId,
    );
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Bike data is retrieved successfully",
        data: result,
    });
};

const updateProduct = async (req: Request, res: Response) => {
    const result = await ProductServices.updateProductIntoDB(
        req.params.productId,
        req.body,
    );
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Bike data is updated successfully",
        data: result,
    });
};

const deleteProductById = async (req: Request, res: Response) => {
    const result = await ProductServices.deleteProductIntoDB(
        req.params.productId,
    );
    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Bike data is deleted successfully",
        data: result,
    });
};

export const ProductControllers = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProductById,
};
