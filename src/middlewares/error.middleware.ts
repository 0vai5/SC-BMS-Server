import { NextFunction, Request, Response } from "express";
import env from "../config/env";

// Improved error handling middleware
const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) {
    return next(error);
  }

  const isProd = env.NODE_ENV === "production";

  // Log error for debugging (always log server-side)
  console.error("Error occurred:", {
    message: error?.message,
    stack: error?.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString(),
  });

  let statusCode = 500;
  let message = "Internal Server Error";
  let details: any = undefined;

  // http-errors (createError) provide `status` or `statusCode`
  if (error?.status || error?.statusCode) {
    statusCode = error.status || error.statusCode;
    message = error.message || message;
  }

  // Zod validation errors
  else if (error?.name === "ZodError" || error?.issues) {
    statusCode = 400;
    message = "Validation failed";
    details = error.issues || error.errors || error;
  }

  // Mongoose validation errors
  else if (error?.name === "ValidationError") {
    statusCode = 400;
    message = error.message || "Validation failed";
    details = error.errors;
  }

  // Duplicate key error
  else if (error?.code === 11000) {
    statusCode = 400;
    const field = error.keyValue
      ? Object.keys(error.keyValue).join(", ")
      : "field";
    message = `Duplicate value for ${field}`;
    details = error.keyValue;
  }

  // Cast error (invalid ObjectId)
  else if (error?.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
  }

  // JWT errors
  else if (error?.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  } else if (error?.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  }

  // Fallback to any provided message
  else if (error?.message) {
    message = error.message;
  }

  const payload: any = {
    success: false,
    message,
  };

  if (details) payload.details = details;

  if (!isProd && error?.stack) payload.stack = error.stack;

  res.status(statusCode).json(payload);
};

export default errorHandler;
