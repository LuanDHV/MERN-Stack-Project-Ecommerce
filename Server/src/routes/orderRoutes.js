// src/routes/orderRoutes.js
import express from 'express';
import * as orderController from '../controllers/orderController.js';

const router = express.Router();

// Lấy tất cả đặt hàng
router.get('/', orderController.getOrders);

// Lấy một đặt hàng cụ thể
router.get('/:id', orderController.getOrderById);

// Lấy tất cả đặt hàng của một người dùng cụ thể (theo userId)
router.get('/user/:userId', orderController.getOrdersByUserId);

// Cập nhật một đặt hàng
router.post('/', orderController.createOrder);

// Cập nhật một đặt hàng
router.put('/:id', orderController.updateOrder);

// Xóa một đặt hàng 
router.delete('/:id', orderController.deleteOrder);

export default router;
