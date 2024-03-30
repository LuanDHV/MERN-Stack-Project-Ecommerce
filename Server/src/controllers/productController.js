// src/controllers/productController.js
import * as productService from '../services/productService.js';

// Lấy tất cả sản phẩm
export const getProducts = async (req, res) => {
    try {
        const products = await productService.getProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy một sản phẩm cụ thể
export const getProductById = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await productService.getProductById(productId);
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy sản phẩm từ danh mục
export const getProductsByCategory = async (req, res) => {
    const categoryId = req.params.categoryId;
    try {
        const products = await productService.getProductsByCategory(categoryId);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Thêm một sản phẩm mới
export const createProduct = async (req, res) => {
    const { name, price, discount, images, colors, sizes, categories, countInStock } = req.body;
    try {
        const newProduct = await productService.createProduct({ name, price, discount, images, colors, sizes, categories, countInStock });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Cập nhật một sản phẩm
export const updateProduct = async (req, res) => {
    const productId = req.params.id;
    const { name, price, discount, images, colors, sizes, categories, countInStock } = req.body;
    try {
        const updatedProduct = await productService.updateProduct(productId, { name, price, discount, images, colors, sizes, categories, countInStock });
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Xóa một sản phẩm
export const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const deletedProduct = await productService.deleteProduct(productId);
        res.json(deletedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
