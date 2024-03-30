// src/models/userModel.js
import mongoose, { Schema } from 'mongoose';

// Định nghĩa schema cho User
const userSchema = new Schema({
    username: { type: String, required: true },  // Tên người dùng, yêu cầu
    email: { type: String, required: true },  // Địa chỉ email, yêu cầu
    password: { type: String, required: true },  // Mật khẩu, yêu cầu
    agreedTerms: { type: Boolean, default: false }, // Thêm trường cho điều khoản
    role: { type: String, enum: ['user', 'admin'], default: 'user' },  // Vai trò người dùng, giá trị mặc định là 'user'
    otp: { type: String }
}, { timestamps: true });

// Tạo model User từ schema đã định nghĩa
const User = mongoose.model('User', userSchema);

export default User;
