import mongoose from "mongoose";
import env from "./env";

const { MONGODB_URI } = env;

const connectDB = async (): Promise<void> => {
  try {
    if (!MONGODB_URI) {
      throw new Error("MongoDB URI is not defined in environment variables.");
    }
    const connection = await mongoose.connect(MONGODB_URI!);

    console.log("MongoDB Connected Successfully: ", connection.connection.host);
  } catch (error) {
    console.log("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;