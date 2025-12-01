import express from "express";
import bookRoutes from "./routes/books-routes";
import { logger } from "./middlewares/logger";

const PORT: number = 2000;
const app = express();

app.use(express.json());
app.use(logger);
app.use("/api", bookRoutes);

app.listen(PORT, () => {
  console.log(`App running on ${PORT} port.`);
});
