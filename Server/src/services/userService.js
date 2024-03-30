// src/services/userService.js
import User from '../models/userModel.js';

// Lấy tất cả các người dùng từ cơ sở dữ liệu.
export const getUsers = async () => {
    return await User.find();
};

// Lấy một người dùng từ cơ sở dữ liệu dựa trên ID.
export const getUserById = async (userId) => {
    return await User.findById(userId);
};

// Lấy một người dùng từ cơ sở dữ liệu dựa trên email.
export const getUserByEmail = async (email) => {
    return await User.findOne({ email });
};

// Tạo một người dùng mới và lưu vào cơ sở dữ liệu.
export const createUser = async (userData) => {
    const newUser = new User(userData);
    return await newUser.save();
};

// Cập nhật một người dùng trong cơ sở dữ liệu.
export const updateUser = async (userId, userData) => {
    return await User.findByIdAndUpdate(userId, userData, { new: true });
};

// Xóa một người dùng khỏi cơ sở dữ liệu dựa trên ID.
export const deleteUser = async (userId) => {
    return await User.findByIdAndDelete(userId);
};

