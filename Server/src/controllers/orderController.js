// src/controllers/orderController.js
import * as orderService from '../services/orderService.js';
import * as emailService from '../services/emailService.js';


// Lấy tất cả đặt hàng
export const getOrders = async (req, res) => {
    try {
        const orders = await orderService.getOrders();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy một đặt hàng cụ thể
export const getOrderById = async (req, res) => {
    const orderId = req.params.id;
    try {
        const order = await orderService.getOrderById(orderId);
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy tất cả đặt hàng của một người dùng cụ thể (theo userId)
export const getOrdersByUserId = async (req, res) => {
    const userId = req.params.userId;
    try {
        const orders = await orderService.getOrdersByUserId(userId);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Thêm một đặt hàng mới
export const createOrder = async (req, res) => {
    const orderData = req.body;
    try {
        const newOrder = await orderService.createOrder(orderData);

        // Gửi email xác nhận đơn hàng
        await emailService.sendOrderConfirmationEmail(
            orderData.email,
            newOrder._id,
            orderData,
        );
        res.status(201).json(newOrder);
    } catch (error) {
        console.error("Error creating order or sending email:", error);
        res.status(400).json({ message: error.message });
    }
};

// Cập nhật một đặt hàng
export const updateOrder = async (req, res) => {
    const orderId = req.params.id;
    const orderData = req.body;
    try {
        const updatedOrder = await orderService.updateOrder(orderId, orderData);
        res.json(updatedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Xóa một đặt hàng
export const deleteOrder = async (req, res) => {
    const orderId = req.params.id;
    try {
        const deletedOrder = await orderService.deleteOrder(orderId);
        res.json(deletedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

