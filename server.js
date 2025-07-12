import express from "express";
import userRouter from "./routers/user.js"
import productRouter from "./routers/product.js"
import orderRouter from "./routers/order.js"
import dotenv  from "dotenv"
import cors from 'cors';
import { connectToDb } from "./Config/db.js";


dotenv.config();
const app = express();
connectToDb();
app.use(cors());
app.use(express.json())
app.use("/api/order", orderRouter)
app.use("/api/user", userRouter)
app.use("/api/product", productRouter)
let port = process.env.PORT;
app.listen(port, "0.0.0.0", () => {
    console.log("app is listen on port " + port)
})



