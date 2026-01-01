import { Request, Response } from "express";
import ProductSchema from "../models/products.model";
import ProductBodySchema, {
  ProductPatchSchema,
} from "../validators/product.validator";

export async function CreateProduct(request: Request, response: Response) {
  try {
    const { success, error, data } = ProductBodySchema.safeParse(request.body);
    if (!success) {
      response.status(400).json({
        success: false,
        message: `Error while parsing schema ${error.issues[0].message}`,
      });
    }

    const newProduct = await ProductSchema.create(data!);

    response.status(201).json({
      status: "created",
      message: "New product created.",
      data: newProduct,
    });
  } catch (error) {
    response.status(400).json({ status: "error", message: error });
  }
}

export async function GetAllProducts(request: Request, response: Response) {
  try {
    const allProducts = await ProductSchema.find();

    if (allProducts) {
      return response.status(200).json({
        status: "success",
        message: "Fetched all products.",
        data: allProducts,
      });
    }
  } catch (error) {
    return response.status(400).json({ status: "error", message: error });
  }
}

export async function GetProduct(
  request: Request<{ id: string }>,
  response: Response
) {
  try {
    const product = await ProductSchema.findById(request.params.id);

    if (product) {
      return response
        .status(200)
        .json({ status: "success", message: "Product found.", data: product });
    }
  } catch (error) {
    return response.status(400).json({
      success: "error",
      message: error,
    });
  }
}

export async function UpdateProduct(request: Request, response: Response) {
  try {
    const { success, error, data } = ProductBodySchema.safeParse(request.body);

    if (!success) {
      return response.status(400).json({
        status: false,
        message: error.issues[0].message,
      });
    }

    const updatedProduct = await ProductSchema.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true, runValidators: true }
    );

    if (updatedProduct) {
      return response.status(200).json({
        status: "updated",
        message: "Product updated successfully.",
        data: updatedProduct,
      });
    }
  } catch (error) {
    return response.status(400).json({
      status: "error",
      message: error,
    });
  }
}

export async function DeleteProduct(request: Request, response: Response) {
  try {
    const { success, error, data } = ProductPatchSchema.safeParse(request.body);

    if (!success) {
      return response.status(400).json({
        status: false,
        message: error.issues[0].message,
      });
    }

    const product = await ProductSchema.findByIdAndUpdate(
      request.params.id,
      { $set: data },
      { new: true, runValidators: true }
    );

    if (product) {
      return response.status(200).json({
        status: "deleted",
        message: "Product has been deleted.",
        data: product,
      });
    }
  } catch (error) {
    return response.status(400).json({
      status: "error",
      message: error,
    });
  }
}
