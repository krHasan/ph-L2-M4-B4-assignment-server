import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import { ProductRouters } from "./app/modules/product/product.route";
import { OrderRouters } from "./app/modules/order/order.route";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use(cookieParser());

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.use(
    globalErrorHandler as (
        err: any,
        req: Request,
        res: Response,
        next: NextFunction,
    ) => any,
);
app.use(notFound as (req: Request, res: Response, next: NextFunction) => any);

export default app;
