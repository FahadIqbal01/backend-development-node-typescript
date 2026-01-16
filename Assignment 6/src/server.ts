import dotenv from "dotenv";
dotenv.config();

import express, { Application } from "express";
import userRouter from "./routes/user.routes";
import logger from "./middlewares/logger";
import { ConnectDB } from "./database/db-connect";

const PORT: number = Number(process.env.PORT) || 2501;

const app: Application = express();

app.use(logger);

app.use(express.json());
app.use("/api/v4/", userRouter);

ConnectDB();

app.listen(PORT, () => {
  console.log(`App is running on ${process.env.PORT} port.`);
});
