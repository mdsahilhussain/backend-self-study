import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      "MongoDB connected successfully",
      `${connectionInstance.connection.host}`,
      "read connection instance details in the console",
      `${connectionInstance}`
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with failure
    throw error;
  }
};

export default connectDB;
//! this approach is good but not not industrial standard way of doing things, its polluting the index.js file
