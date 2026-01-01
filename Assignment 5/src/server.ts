import dotenv from "dotenv";
dotenv.config();

import express, { Application } from "express";

import ConnectDatabase from "./database/db-connect";
import productRouter from "./routes/products.route";
import logger from "./middlewares/logger";

const app: Application = express();

app.use(logger);
app.use(express.json());

app.use("/api/v3/", productRouter);

ConnectDatabase();

app.listen(process.env.PORT, () => {
  console.log(`App is running on port ${process.env.PORT}`);
});
