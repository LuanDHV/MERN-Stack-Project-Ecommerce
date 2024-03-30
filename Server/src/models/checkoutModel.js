// src/models/checkoutModel.js
import mongoose, { Schema } from 'mongoose';

// Định nghĩa schema cho Checkout
const checkoutSchema = new Schema({
    product: { type: String, required: true },  // Tên sản phẩm, yêu cầu
    totalPrice: { type: Number, required: true },  // Tổng giá trị đơn hàng, yêu cầu
}, { timestamps: true });

// Tạo model Checkout từ schema đã định nghĩa
const Checkout = mongoose.model('Checkout', checkoutSchema);

export default Checkout;
