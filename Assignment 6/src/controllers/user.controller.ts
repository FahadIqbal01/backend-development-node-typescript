import { Request, Response } from "express";
import user from "../models/user.model";
import {
  userValidator,
  loginValidator,
  userValidatorForPartialUpdate,
} from "../validators/user.validator";
import { GetHash, CompareHash } from "../utils/hashing";
import { GenerateJWTToken } from "../utils/jwt-token";
import { RequestBody } from "../types/authorization.type";
import JwtPayload from "../types/jwtPayload.type";

export async function GetAllUsers(request: RequestBody, response: Response) {
  const allUsers = await user.find({ isActive: true });
  if (!allUsers) {
    return response
      .status(400)
      .json({ status: "failed", message: "No users to found." });
  }

  return response.status(200).json({
    status: "success",
    message: "Get all users successfully.",
    count: allUsers.length,
    data: allUsers,
  });
}

export async function GetUserById(request: RequestBody, response: Response) {
  try {
    const userId: string | string[] = request.params.id;
    if (!userId) {
      return response
        .status(400)
        .json({ status: "failed", message: "Invalid user id." });
    }

    const _user = await user.findById(userId, { isActive: true });
    if (!_user || !_user.isActive) {
      return response
        .status(404)
        .json({ status: "failed", message: "User not found." });
    } else {
      return response.status(200).json({
        status: "success",
        message: "Get user data successful.",
        data: _user,
      });
    }
  } catch (error) {
    return response.status(404).json({ status: error, message: error });
  }
}

export async function CreateUser(request: Request, response: Response) {
  try {
    const { data, success, error } = userValidator.safeParse(request.body);
    if (!success) {
      return response
        .status(400)
        .json({ status: false, message: error.issues[0].message });
    }

    const existingUser = await user.findOne({ email: data.email });
    if (existingUser) {
      return response.status(409).json({
        status: "failed",
        message: `User with given email ${existingUser.email} already exist.`,
      });
    }

    const hashedPassword: string = await GetHash(data.password);

    const newUser = await user.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      age: data.age,
      role: data.role,
    });

    return response.status(200).json({
      status: "success",
      message: "User created successfully.",
      data: newUser,
    });
  } catch (error) {
    return response.status(400).json({ status: "error", message: error });
  }
}

export async function UpdateUser(request: RequestBody, response: Response) {
  try {
    const userId: string | string[] = request.params.id;
    if (!userId) {
      return response
        .status(400)
        .json({ status: "failed", message: "Invalid user id.", data: userId });
    }

    const { data, success, error } = userValidatorForPartialUpdate.safeParse(
      request.body
    );
    if (!success) {
      return response
        .status(400)
        .json({ status: "failed", message: error.issues[0].message });
    }

    const updatedUser = await user.findByIdAndUpdate(
      userId,
      { $set: data },
      { new: true, runValidators: true }
    );

    return response.status(200).json({
      status: "success",
      message: "User updated successfully.",
      data: data,
      updatedUser: updatedUser,
    });
  } catch (error) {
    return response.status(400).json({ status: "error", message: error });
  }
}

export async function DeleteUser(request: RequestBody, response: Response) {
  try {
    const userId: string | string[] = request.params.id;
    if (!userId) {
      return response
        .status(400)
        .json({ status: "failed", message: "Invalid user id.", data: userId });
    }

    const _user = await user.findById(userId);
    if (!_user) {
      return response
        .status(404)
        .json({ status: "failed", message: "User not found." });
    }

    const activeStatus: boolean = _user.isActive;
    if (activeStatus) {
      const { data, success, error } = userValidatorForPartialUpdate.safeParse(
        request.body
      );
      if (!success) {
        return response
          .status(400)
          .json({ status: "failed", message: error.issues[0].message });
      }

      const updatedtUser = await user.findByIdAndUpdate(
        userId,
        { $set: data },
        { new: true, runValidators: true }
      );

      return response.status(200).json({
        status: "success",
        message: "User deleted partially.",
        data: data,
        deletedUser: updatedtUser,
      });
    } else {
      await user.findByIdAndDelete(userId, {
        new: true,
        runValidators: true,
      });

      return response
        .status(200)
        .json({ status: "success", message: "User deleted completely." });
    }
  } catch (error) {
    return response.status(400).json({ status: "error", message: error });
  }
}

export async function LoginUser(request: Request, response: Response) {
  try {
    const { data, success, error } = loginValidator.safeParse(request.body);
    if (!success) {
      return response
        .status(400)
        .json({ status: false, message: error.issues[0].message });
    }

    const existingUser = await user.findOne({ email: data?.email });
    if (!existingUser) {
      return response.status(409).json({
        status: "failed",
        message: "User not found.",
      });
    }

    const loginStatus: boolean = await CompareHash(
      data.password,
      existingUser.password
    );
    if (!loginStatus) {
      return response
        .status(400)
        .json({ status: false, message: "Password is incorrect." });
    }

    const payload: JwtPayload = {
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role,
    };
    const accessToken: string = GenerateJWTToken(payload);

    return response.status(200).json({
      status: loginStatus,
      message: "User login successfully.",
      token: accessToken,
    });
  } catch (error) {
    return response.status(400).json({
      status: "error",
      message: error,
    });
  }
}
