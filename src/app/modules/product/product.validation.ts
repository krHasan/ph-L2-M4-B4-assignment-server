import { z } from "zod";

const productValidationSchema = z.object({
    name: z
        .string()
        .max(255, { message: "Name must be less then 255 characters" })
        .trim(),
    brand: z.string(),
    price: z.number().positive("Price must be a positive number"),
    category: z.enum(["Mountain", "Road", "Hybrid", "Electric"]),
    description: z.string(),
    quantity: z
        .number()
        .int("Quantity must be an integer")
        .min(0, "Quantity cannot be negative"),
    inStock: z.boolean().default(true),
});

export const productUpdateValidationSchema = z.object({
    name: z
        .string()
        .max(255, { message: "Name must be less then 255 characters" })
        .trim()
        .optional(),
    price: z.number().positive("Price must be a positive number").optional(),
    description: z.string().optional(),
    quantity: z
        .number()
        .int("Quantity must be an integer")
        .min(0, "Quantity cannot be negative")
        .optional(),
    inStock: z.boolean().default(true).optional(),
});

export default productValidationSchema;
