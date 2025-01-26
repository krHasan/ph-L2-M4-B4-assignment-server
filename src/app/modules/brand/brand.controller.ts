import { httpStatus } from "../../config/httpStatus";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BrandServices } from "./brand.service";

const addBrand = catchAsync(async (req, res) => {
    const result = await BrandServices.addBrandIntoDB(req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Brand is added successfully",
        data: result,
    });
});

const getAllBrands = catchAsync(async (req, res) => {
    const result = await BrandServices.getAllBrandsFromDB();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Brands list retrieved successfully",
        data: result,
    });
});

export const BrandController = {
    addBrand,
    getAllBrands,
};
