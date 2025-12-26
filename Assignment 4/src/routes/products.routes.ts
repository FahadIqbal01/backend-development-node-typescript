import Router from "express";
import {
  GetAllProducts,
  GetProduct,
  CreateProduct,
  UpdateProduct,
  DeleteProduct,
} from "../controllers/products.controller";

const ProductRouter = Router();

ProductRouter.get("/products", GetAllProducts);
ProductRouter.get("/products/:id", GetProduct);
ProductRouter.post("/products", CreateProduct);
ProductRouter.put("/products/:id", UpdateProduct);
ProductRouter.delete("/products/:id", DeleteProduct);

export default ProductRouter;
