import { NextFunction, Request, Response } from "express";
import CustomError from "http-errors";
import { verifyToken } from "../utils/token";

const authGuard = (req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(CustomError(401, "Authorization token is required"));
  }

  const token = authHeader.split(" ")[1]?.trim();

  if (!token) {
    return next(CustomError(401, "Authorization token is required"));
  }

  try {
    const payload = verifyToken(token);

    req.user = {
      id: payload.id,
    };

    return next();
  } catch (err) {
    return next(err);
  }
};

export { authGuard };
