import { Request, Response } from "express";
import Product from "../models/products.model";

interface RequestBody {
  title: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  createdAt: Date;
}

export async function GetAllProducts(request: Request, response: Response) {
  try {
    const allProducts = await Product.find();

    if (allProducts) {
      response.status(200).json({
        status: "success",
        message: "Getting all products successfully.",
        data: allProducts,
      });
    }
  } catch (error) {
    response.status(400).json({
      status: "error",
      message: error,
    });
  }
}

export async function GetProduct(
  request: Request<{ id: string }>,
  response: Response
) {
  try {
    const product = await Product.findById({ _id: request.params.id });

    if (product) {
      response.status(200).json({
        status: "success",
        message: `Get product successfully.`,
        data: product,
      });
    }
  } catch (error) {
    response.status(400).json({
      status: "error",
      message: error,
    });
  }
}

export async function CreateProduct(
  request: Request<{}, {}, RequestBody>,
  response: Response
) {
  try {
    const newProduct = new Product(request.body);
    newProduct.createdAt = new Date();
    const savedProduct = await newProduct.save();

    if (savedProduct) {
      response.status(200).json({
        status: "success",
        message: "Product created successfully.",
        data: savedProduct,
      });
    }
  } catch (error) {
    response.status(204).json({
      status: "error",
      message: error,
    });
  }
}

export async function UpdateProduct(
  request: Request<{ id: string }, {}, RequestBody>,
  response: Response
) {
  try {
    const product = await Product.findByIdAndUpdate(
      { _id: request.params.id },
      request.body,
      { new: true, runValidators: true }
    );

    if (product) {
      response.status(200).json({
        status: "success",
        message: "Updated product successfully.",
        data: product,
      });
    }
  } catch (error) {
    response.status(400).json({ status: "error", message: error });
  }
}

export async function DeleteProduct(
  request: Request<{ id: string }>,
  response: Response
) {
  try {
    const product = await Product.findByIdAndDelete(
      { _id: request.params.id },
      { new: true, runValidators: true }
    );

    if (product) {
      response
        .status(200)
        .json({ status: "success", message: "Product deleted successfully." });
    }
  } catch (error) {
    response.status(400).json({ status: "error", message: error });
  }
}
