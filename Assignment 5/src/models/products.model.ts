import mongoose from "mongoose";
import ProductSchemaType from "../types/products.type";

const productSchema: mongoose.Schema<ProductSchemaType> =
  new mongoose.Schema<ProductSchemaType>(
    {
      title: { type: String, required: true, unique: true },
      description: { type: String, required: true },
      price: { type: Number, required: true, min: 0 },
      quantity: { type: Number, required: true, min: 0 },
      category: { type: String, required: true, min: 0 },
      brand: { type: String, default: "Generic" },
      images: { type: [String], default: [] },
      rating: { type: Number, min: 0, max: 5, default: 0 },
      isActive: { type: Boolean, default: true },
      createdAt: { type: Date },
      updatedAt: { type: Date },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model<ProductSchemaType>("Products", productSchema);
