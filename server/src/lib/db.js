import mongoose from "mongoose";
import "colors";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB);
    console.log(`MongoDB connected: ${conn.connection.host}`.bgGreen.white);
  } catch (error) {
    console.log("MongoDB connection error:".bgRed.white, error);
  }
};
