// src/services/productService.js
import Product from '../models/productModel.js';
import axios from 'axios';  // Thêm dòng này

const API_URL = 'http://localhost:8000/api/products';

//Lấy tất cả các sản phẩm từ cơ sở dữ liệu.
export const getProducts = async () => {
    return await Product.find();
};

//Lấy một sản phẩm từ cơ sở dữ liệu dựa trên ID.
export const getProductById = async (productId) => {
    return await Product.findById(productId);
};

// Lấy sản phẩm từ danh mục
export const getProductsByCategory = async (categoryId) => {
    try {
        const response = await axios.get(`${API_URL}/?categories=${categoryId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

//Tạo một sản phẩm mới và lưu vào cơ sở dữ liệu.
export const createProduct = async (productData) => {
    const newProduct = new Product(productData);
    return await newProduct.save();
};

//Cập nhật một sản phẩm trong cơ sở dữ liệu.
export const updateProduct = async (productId, productData) => {
    return await Product.findByIdAndUpdate(productId, productData, { new: true });
};

//Xóa một sản phẩm khỏi cơ sở dữ liệu dựa trên ID.
export const deleteProduct = async (productId) => {
    return await Product.findByIdAndDelete(productId);
};
