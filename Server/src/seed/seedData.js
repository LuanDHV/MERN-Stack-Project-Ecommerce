import mongoose from "mongoose";
import dotenv from "dotenv";

import usersData from "../seed/usersData.js";
import categoriesData from "../seed/categoriesData.js";
import productsData from "../seed/productsData.js";

import userModel from "../models/userModel.js";
import categoryModel from "../models/categoryModel.js";
import productModel from "../models/productModel.js";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log("MongoDB connected");

    await userModel.insertMany(usersData);
    console.log("Seeded users");

    await categoryModel.insertMany(categoriesData);
    console.log("Seeded categories");

    await productModel.insertMany(productsData);
    console.log("Seeded products");

    console.log("All data seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding all data:", error);
    process.exit(1);
  }
};

seedData();
