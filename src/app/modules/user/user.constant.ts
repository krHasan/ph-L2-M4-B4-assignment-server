export const USER_ROLE = {
    customer: "customer",
    admin: "admin",
} as const;
export const userRoleArray = Object.values(USER_ROLE);

export const USER_STATUS = {
    active: "active",
    blocked: "blocked",
} as const;
export const userStatusArray = Object.values(USER_STATUS);
