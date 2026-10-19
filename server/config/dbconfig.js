import mongoose from "mongoose";
import { DB_CLOUD_URL } from "./config.js"; // 

const dbconfig = async () => {
  try {
    // Agar cloud connection use karna hai:
    await mongoose.connect(DB_CLOUD_URL);
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("DB is fail to connect:", error.message);
  }
};

export default dbconfig;