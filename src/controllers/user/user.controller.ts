import asyncHandler from "../../utils/asyncHandler";
import { Request, Response } from "express";
import validate from "../../utils/validate";
import { UserSchema, UserUpdateSchema } from "../../schemas/user.schema";
import User from "../../models/user.model";
import CustomError from "http-errors";
import { APIResponse } from "../../utils/response";

const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { data, success, error } = validate(UserSchema, req.body);

  if (!success) {
    const message = error.issues?.[0]?.message || "Validation failed";
    throw CustomError(400, message);
  }

  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw CustomError(409, "Email already exists");
  }

  const newUser = new User(data);
  await newUser.save();

  res.status(201).json(new APIResponse("User created successfully", newUser));
});

const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { data, success, error } = validate(UserUpdateSchema, req.body);

  if (!success) {
    const message = error.issues?.[0]?.message || "Validation failed";
    throw CustomError(400, message);
  }

  const userId = req.params.id;

  const updatedUser = await User.findByIdAndUpdate(userId, data, { new: true });

  if (!updatedUser) {
    throw CustomError(404, "User not found");
  }

  res
    .status(200)
    .json(new APIResponse("User updated successfully", updatedUser));
});

const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.id;

  const deletedUser = await User.findByIdAndUpdate(
    userId,
    { isDeleted: true },
    { new: true },
  );

  if (!deletedUser) {
    throw CustomError(404, "User not found");
  }

  res
    .status(200)
    .json(new APIResponse("User deleted successfully", deletedUser));
});

const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find({ isDeleted: false });

  res.status(200).json(new APIResponse("Users retrieved successfully", users));
});

export { createUser, updateUser, deleteUser, getAllUsers };
