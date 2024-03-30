// src/routes/checkoutRoutes.js
import express from 'express';
import * as checkoutController from '../controllers/checkoutController.js';

const router = express.Router();

// Lấy tất cả thông tin checkout
router.get('/', checkoutController.getCheckouts);

// Lấy thông tin checkout cụ thể
router.get('/:id', checkoutController.getCheckoutById);

// Thêm một thông tin checkout mới
router.post('/', checkoutController.createCheckout);

// Cập nhật thông tin checkout
router.put('/:id', checkoutController.updateCheckout);

// Xóa thông tin checkout
router.delete('/:id', checkoutController.deleteCheckout);

export default router;
