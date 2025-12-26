import mongoose from "mongoose";
import ProductType from "../types/product.type";

const ProductSchema = new mongoose.Schema<ProductType>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, min: 0 },
    quantity: { type: Number, min: 0 },
    category: { type: String, default: "General" },
    createdAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model<ProductType>("Product", ProductSchema);
