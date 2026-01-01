import zod from "zod";

const ProductBodySchema = zod.object({
  title: zod.string(),
  description: zod.string(),
  price: zod.number().min(0),
  quantity: zod.number().min(0),
  category: zod.string().min(0),
  brand: zod.string().default("Generic"),
  images: zod.array(zod.string()).default([]),
  rating: zod.number().min(0).max(5).default(0),
  isActive: zod.boolean().default(true),
});

export default ProductBodySchema;

// Partial schema for PATCH
export const ProductPatchSchema = ProductBodySchema.partial();
