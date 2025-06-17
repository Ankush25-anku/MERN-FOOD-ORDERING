import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Loads variables from .env

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI not found in .env");
    }

    await mongoose.connect(`${uri}/food-del`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};
