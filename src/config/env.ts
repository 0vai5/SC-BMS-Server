import dotenv from "dotenv";

dotenv.config();

const raw = process.env;

const PORT = raw.PORT ? Number(raw.PORT) : 5000;
const NODE_ENV = raw.NODE_ENV || "development";
const CORS_ORIGIN = raw.CORS_ORIGIN || "*";
const JWT_SECRET = raw.JWT_SECRET;
const JWT_EXPIRES_IN = raw.JWT_EXPIRES_IN || "1d";
const MONGODB_URI = raw.MONGODB_URI;

// Fail fast for critical secrets in non-development environments
if (!JWT_SECRET) {
  throw new Error("Environment variable JWT_SECRET is required");
}

if (!MONGODB_URI) {
  throw new Error("Environment variable MONGODB_URI is required");
}

const env = {
  PORT,
  NODE_ENV,
  CORS_ORIGIN,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  MONGODB_URI,
};

export default env;
