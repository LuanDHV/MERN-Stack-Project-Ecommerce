import mongoose from "mongoose";
import dotenv from "dotenv";

import userModel from "../models/userModel.js";
import categoryModel from "../models/categoryModel.js";
import productModel from "../models/productModel.js";

dotenv.config();

const deleteData = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log("MongoDB connected");

    await userModel.deleteMany();
    console.log("Deleted users");

    await categoryModel.deleteMany();
    console.log("Deleted categories");

    await productModel.deleteMany();
    console.log("Deleted products");

    console.log("All data deleted successfully!");
    process.exit();
  } catch (error) {
    console.error("Error deleting data:", error);
    process.exit(1);
  }
};

deleteData();
