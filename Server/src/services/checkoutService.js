// src/services/checkoutService.js
import Checkout from '../models/checkoutModel.js';

// Lấy tất cả thông tin checkout từ cơ sở dữ liệu.
export const getCheckouts = async () => {
    return await Checkout.find();
};

// Lấy thông tin checkout từ cơ sở dữ liệu dựa trên ID.
export const getCheckoutById = async (checkoutId) => {
    return await Checkout.findById(checkoutId);
};

// Tạo một thông tin checkout mới và lưu vào cơ sở dữ liệu.
export const createCheckout = async (checkoutData) => {
    const newCheckout = new Checkout(checkoutData);
    return await newCheckout.save();
};

// Cập nhật thông tin checkout trong cơ sở dữ liệu.
export const updateCheckout = async (checkoutId, checkoutData) => {
    return await Checkout.findByIdAndUpdate(checkoutId, checkoutData, { new: true });
};

// Xóa thông tin checkout khỏi cơ sở dữ liệu dựa trên ID.
export const deleteCheckout = async (checkoutId) => {
    return await Checkout.findByIdAndDelete(checkoutId);
};
