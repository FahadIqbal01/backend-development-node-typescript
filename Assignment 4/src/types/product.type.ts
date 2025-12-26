import { Document } from "mongoose";

interface ProductType extends Document {
  title: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  createdAt: Date;
}

export default ProductType;
