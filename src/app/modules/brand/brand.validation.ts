import { z } from "zod";

const createBrandValidationSchema = z.object({
    body: z.array(
        z.object({
            name: z.string(),
            iconUrl: z.string().optional(),
        }),
    ),
});

export const BrandValidation = {
    createBrandValidationSchema,
};
