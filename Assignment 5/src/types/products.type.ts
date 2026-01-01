import { Document } from "mongoose";

interface ProductSchemaType extends Document {
  title: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  brand: string;
  rating: number;
  images: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default ProductSchemaType;
