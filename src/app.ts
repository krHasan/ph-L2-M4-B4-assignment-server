import express, { Application, Request, Response } from "express";
import cors from "cors";
import { ProductRouters } from "./app/modules/product/product.route";
import { OrderRouters } from "./app/modules/order/order.route";
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

app.use("/api/products", ProductRouters);
app.use("/api/orders", OrderRouters);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

export default app;
