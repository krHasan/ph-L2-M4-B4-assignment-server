import { Router } from "express";
import { UserRoutes } from "../modules/user/user.router";
import { AuthRoutes } from "../modules/auth/auth.route";
import { OrderRouters } from "../modules/order/order.route";
import { ProductRoutes } from "../modules/product/product.route";
import { BrandRoutes } from "../modules/brand/brand.route";

const router = Router();

const moduleRoutes = [
    {
        path: "/users",
        route: UserRoutes,
    },
    {
        path: "/auth",
        route: AuthRoutes,
    },
    {
        path: "/brands",
        route: BrandRoutes,
    },
    {
        path: "/products",
        route: ProductRoutes,
    },
    {
        path: "/orders",
        route: OrderRouters,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
