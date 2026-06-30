import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import asyncHandler from "../../utils/asyncHandler";
import validate from "../../utils/validate";
import { UserSchema } from "../../schemas/user.schema";
import { LoginSchema } from "../../schemas/auth.schema";
import User from "../../models/user.model";
import { APIResponse } from "../../utils/response";
import { generateToken } from "../../utils/token";
import CustomError from "http-errors";

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { data, success, error } = validate(LoginSchema, req.body);

  if (!success) {
    const message = error.issues?.[0]?.message || "Validation failed";
    throw CustomError(400, message);
  }

  const { email, password } = data;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw CustomError(401, "Invalid email or password");
  }

  if (!user.isActive || user.isDeleted) {
    throw CustomError(403, "Account is not active");
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    throw CustomError(401, "Invalid email or password");
  }

  const token = generateToken(user._id.toString());

  res.status(200).json(
    new APIResponse("Login successful", {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    }),
  );
});
const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    throw CustomError(401, "Unauthorized");
  }

  const user = await User.findById(userId);

  if (!user || user.isDeleted) {
    throw CustomError(404, "User not found");
  }

  if (!user.isActive) {
    throw CustomError(403, "Account is not active");
  }

  res.status(200).json(
    new APIResponse("User profile fetched successfully", {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    }),
  );
});

export { loginUser, getCurrentUser };
