export const PRODUCT_CATEGORY = {
    Mountain: "Mountain",
    Road: "Road",
    Hybrid: "Hybrid",
    Electric: "Electric",
} as const;
export const productCategoryArray = Object.values(PRODUCT_CATEGORY);

export const productSearchableFields = [
    "name",
    "brand.name",
    "model",
    "category",
    "description",
];

export const PRODUCT_STATUS = {
    active: "active",
    inactive: "inactive",
} as const;
export const productStatusArray = Object.values(PRODUCT_STATUS);
