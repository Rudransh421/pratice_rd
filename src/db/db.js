import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
  try {
    const connectInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB Connected !! DB host is ${connectInstance.connection.host}`
    );
  } catch (err) {
    console.log("Error in connection MongoDB", err);
    process.exit(1);
  }
};

export default connectDB;
