import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "../models/userModel.js";
import Category from "../models/categoryModel.js";
import Product from "../models/productModel.js";

dotenv.config();

const deleteData = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log("MongoDB connected");

    await User.deleteMany();
    console.log("Deleted users");

    await Category.deleteMany();
    console.log("Deleted categories");

    await Product.deleteMany();
    console.log("Deleted products");

    console.log("All data deleted successfully!");
    process.exit();
  } catch (error) {
    console.error("Error deleting data:", error);
    process.exit(1);
  }
};

deleteData();
