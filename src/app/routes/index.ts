import { Router } from "express";
import { UserRoutes } from "../modules/user/user.router";
import { AuthRoutes } from "../modules/auth/auth.route";
import { OrderRouters } from "../modules/order/order.route";
import { ProductRouters } from "../modules/product/product.route";

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
        path: "/products",
        route: ProductRouters,
    },
    {
        path: "/orders",
        route: OrderRouters,
    },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
