import mongoose from "mongoose";
import dotenv from "dotenv";

import users from "../seed/usersData.js";
import categories from "../seed/categoriesData.js";
import products from "../seed/productsData.js";

import User from "../models/userModel.js";
import Category from "../models/categoryModel.js";
import Product from "../models/productModel.js";

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log("MongoDB connected");

    await User.insertMany(users);
    console.log("Seeded users");

    await Category.insertMany(categories);
    console.log("Seeded categories");

    await Product.insertMany(products);
    console.log("Seeded products");

    console.log("All data seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding all data:", error);
    process.exit(1);
  }
};

seedData();
