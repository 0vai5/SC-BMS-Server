import cors from "cors";
import express, { Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import connectDB from "./config/db";
import env from "./config/env";
import errorHandler from "./middlewares/error.middleware";
import router from "./routes";
import { APIResponse } from "./utils/response";

const app = express();

const { CORS_ORIGIN } = env;

// TODO: DB Connection

connectDB();

// Middleware
app.use(helmet()); // Security headers
app.use(
  cors({
    origin: CORS_ORIGIN || "*",
  }),
);
app.use(morgan("combined")); // Logging
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Test endpoint
app.get("/", (_, res) => {
  res.json(new APIResponse("Document Analyser is Successfully Running."));
});

// Health check endpoint
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// app.use("/api", router)

app.use(errorHandler);

export default app;
