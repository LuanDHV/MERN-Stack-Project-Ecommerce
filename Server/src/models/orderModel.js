import mongoose, { Schema } from 'mongoose';

// Định nghĩa schema cho Order
const orderSchema = new Schema({
    userID: { type: Schema.Types.ObjectId, required: true }, //ID tài khoàn đặt hàng
    products: [{
        _id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        discount: { type: Number, default: 0 },
        images: [{ type: String, required: true }],
        colors: [{ type: String }],
        sizes: [{ type: String }],
        categories: [{ type: Schema.Types.ObjectId, ref: 'Category', required: true }],
        countInStock: { type: Number, required: true },
        selectedSize: { type: String, required: true },
    }],
    totalPrice: { type: Number, required: true },
    fullName: { type: String, required: true }, // Tên đặt hàng
    email: { type: String, required: true }, //Email đặt hàng
    phoneNumber: { type: String, required: true }, // SĐT đặt hàng
    address: { type: String, required: true }, // Địa chỉ đặt hàng
    payment: { type: String, required: true }, //Phương thức thanh toán
    status: { type: String, required: true } //Trạng thái đơn hàng

}, { timestamps: true });

// Tạo model Order từ schema đã định nghĩa
const Order = mongoose.model('Order', orderSchema);

export default Order;
