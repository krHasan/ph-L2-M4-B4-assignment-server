import { z } from "zod";
import { productCategoryArray, productStatusArray } from "./product.constant";

const createProductValidationSchema = z.object({
    body: z.object({
        name: z
            .string()
            .max(255, { message: "Name must be less then 255 characters" })
            .trim(),
        brand: z.string({
            invalid_type_error: "Brand must be string",
            required_error: "Brand is required",
        }),
        module: z.string().optional(),
        price: z.number().positive("Price must be a positive number"),
        category: z.enum(productCategoryArray as [string, ...string[]]),
        description: z.string().optional(),
        quantity: z
            .number()
            .int("Quantity must be an integer")
            .min(0, "Quantity cannot be negative")
            .default(0),
    }),
});

const updateProductValidationSchema = z.object({
    body: z.object({
        name: z
            .string()
            .max(255, { message: "Name must be less then 255 characters" })
            .trim()
            .optional(),
        brand: z
            .string({
                invalid_type_error: "Brand must be string",
                required_error: "Brand is required",
            })
            .optional(),
        module: z.string().optional(),
        price: z
            .number()
            .positive("Price must be a positive number")
            .optional(),
        category: z
            .enum(productCategoryArray as [string, ...string[]])
            .optional(),
        description: z.string().optional(),
        quantity: z
            .number()
            .int("Quantity must be an integer")
            .min(0, "Quantity cannot be negative")
            .default(0)
            .optional(),
        inStock: z.boolean().default(true).optional(),
        status: z.enum(productStatusArray as [string, ...string[]]).optional(),
    }),
});

export const ProductValidation = {
    createProductValidationSchema,
    updateProductValidationSchema,
};
