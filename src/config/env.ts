import dotenv from "dotenv";

dotenv.config();

const { PORT, NODE_ENV, CORS_ORIGIN, JWT_SECRET, JWT_EXPIRES_IN, MONGODB_URI } =
  process.env;

const env = {
  PORT: PORT || 5000,
  NODE_ENV: NODE_ENV || "development",
  CORS_ORIGIN: CORS_ORIGIN || "*",
  JWT_SECRET: JWT_SECRET || "your_jwt_secret_key",
  JWT_EXPIRES_IN: JWT_EXPIRES_IN || "1d",
  MONGODB_URI: MONGODB_URI,
};

export default env;
