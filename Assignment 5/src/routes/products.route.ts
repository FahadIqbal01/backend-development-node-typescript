import { Router } from "express";
import {
  CreateProduct,
  GetAllProducts,
  GetProduct,
  UpdateProduct,
  DeleteProduct,
} from "../controllers/products.controller";

const productRouter: Router = Router();

productRouter.post("/products/", CreateProduct);

productRouter.get("/products/", GetAllProducts);
productRouter.get("/products/:id", GetProduct);

productRouter.put("/products/:id", UpdateProduct);

productRouter.patch("/products/:id", DeleteProduct);

export default productRouter;
