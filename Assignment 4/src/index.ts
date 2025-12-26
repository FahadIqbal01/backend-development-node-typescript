import dotenv from "dotenv";
dotenv.config();

import express from "express";

import logger from "./middlewares/logger";
import UserRouter from "./routes/users.routes";
import ProductRouter from "./routes/products.routes";
import ConnectDatabase from "./db/db-connect";

const PORT: number = Number(process.env.PORT) || 1000;

ConnectDatabase();

const app = express();

app.use(logger);
app.use(express.json());

app.use("/api/v2/", UserRouter);
app.use("/api/v2/", ProductRouter);

app.listen(PORT, () => {
  console.log(`App is running on ${PORT} port.`);
});
