// src/controllers/checkoutController.js
import * as checkoutService from '../services/checkoutService.js';

// Lấy tất cả thông tin checkout
export const getCheckouts = async (req, res) => {
    try {
        const checkouts = await checkoutService.getCheckouts();
        res.json(checkouts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy thông tin checkout cụ thể
export const getCheckoutById = async (req, res) => {
    const checkoutId = req.params.id;
    try {
        const checkout = await checkoutService.getCheckoutById(checkoutId);
        res.json(checkout);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Thêm một thông tin checkout mới
export const createCheckout = async (req, res) => {
    const checkoutData = req.body;
    try {
        const newCheckout = await checkoutService.createCheckout(checkoutData);
        res.status(201).json(newCheckout);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Cập nhật thông tin checkout
export const updateCheckout = async (req, res) => {
    const checkoutId = req.params.id;
    const checkoutData = req.body;
    try {
        const updatedCheckout = await checkoutService.updateCheckout(checkoutId, checkoutData);
        res.json(updatedCheckout);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Xóa thông tin checkout
export const deleteCheckout = async (req, res) => {
    const checkoutId = req.params.id;
    try {
        const deletedCheckout = await checkoutService.deleteCheckout(checkoutId);
        res.json(deletedCheckout);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
