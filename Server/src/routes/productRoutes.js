// src/routes/productRoutes.js
import express from 'express';
import * as productController from '../controllers/productController.js';

const router = express.Router();

// Lấy tất cả sản phẩm
router.get('/', productController.getProducts);

// Lấy một sản phẩm cụ thể
router.get('/:id', productController.getProductById);

// Lấy sản phẩm từ danh mục
router.get('/category/:categoryId', productController.getProductsByCategory);

// Cập nhật một sản phẩm
router.post('/', productController.createProduct);

// Cập nhật một sản phẩm
router.put('/:id', productController.updateProduct);

// Xóa một sản phẩm 
router.delete('/:id', productController.deleteProduct);

export default router;
