// src/services/orderService.js
import Order from '../models/orderModel.js';

//Lấy tất cả các đặt hàng từ cơ sở dữ liệu.
export const getOrders = async () => {
    return await Order.find();
};

//Lấy một đặt hàng từ cơ sở dữ liệu dựa trên ID.
export const getOrderById = async (orderId) => {
    return await Order.findById(orderId);
};

// Lấy tất cả đặt hàng của một người dùng cụ thể (theo userId)
export const getOrdersByUserId = async (userId) => {
    return await Order.find({ userId: userId });
};

//Tạo một đặt hàng mới và lưu vào cơ sở dữ liệu.
export const createOrder = async (orderData) => {
    const newOrder = new Order(orderData);
    return await newOrder.save();
};

//Cập nhật một đặt hàng trong cơ sở dữ liệu.
export const updateOrder = async (orderId, orderData) => {
    return await Order.findByIdAndUpdate(orderId, orderData, { new: true });
};


//Xóa một đặt hàng khỏi cơ sở dữ liệu dựa trên ID.
export const deleteOrder = async (orderId) => {
    return await Order.findByIdAndDelete(orderId);
};
