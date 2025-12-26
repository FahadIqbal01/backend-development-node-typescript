import { Request, Response } from "express";
import User from "../models/users.model";

interface RequestBody {
  name: string;
  email: string;
  password: string;
  age: number;
  role: string;
  createdAt: string;
}

export async function GetAllUsers(request: Request, response: Response) {
  try {
    const allUsers = await User.find();

    if (allUsers) {
      response.status(200).json({
        status: "success",
        message: "Get all users successfully.",
        data: allUsers,
      });
    }
  } catch (error) {
    response.status(204).json({ status: "error", message: error });
  }
}

export async function GetUser(
  request: Request<{ id: string }>,
  response: Response
) {
  try {
    const user = await User.findById({ _id: request.params.id });

    if (user) {
      response.status(200).json({
        status: "success",
        message: "Get user successfully.",
        data: user,
      });
    }
  } catch (error) {
    response.status(400).json({ status: "error", message: error });
  }
}

export async function CreateUser(
  request: Request<{}, {}, RequestBody>,
  response: Response
) {
  try {
    const newUser = await User.create(request.body);
    const savedUser = await newUser.save();

    if (savedUser) {
      response.status(200).json({
        status: "success",
        message: "Congrats! User created successfully.",
        data: savedUser,
      });
    }
  } catch (error) {
    response.status(400).json({ status: "error", message: error });
  }
}

export async function UpdateUser(
  request: Request<{ id: string }, {}, RequestBody>,
  response: Response
) {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      {
        _id: request.params.id,
      },
      request.body,
      { new: true, runValidators: true }
    );

    if (updatedUser) {
      response.status(200).json({
        status: "success",
        message: "User fully updated successfully.",
        data: request.body,
      });
    }
  } catch (error) {
    response.status(400).json({ status: "error", message: error });
  }
}

export async function DeleteUser(
  request: Request<{ id: string }>,
  response: Response
) {
  try {
    const user = await User.findByIdAndDelete({ _id: request.params.id });
    if (user) {
      response
        .status(204)
        .json({ status: "success", message: "User deleted successfully." });
    }
  } catch (error) {
    response.status(500).json({ status: "error", message: error });
  }
}
