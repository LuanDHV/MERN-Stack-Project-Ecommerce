// src/controllers/userController.js
import * as userService from '../services/userService.js';
import User from '../models/userModel.js'

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


// Lấy tất cả người dùng
export const getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy một người dùng cụ thể
export const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await userService.getUserById(userId);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Lấy thông tin người dùng bằng email
export const getUserByEmail = async (req, res) => {
    const { email } = req.params;

    try {
        // Tìm người dùng theo email
        const user = await User.findOne({ email });

        // Kiểm tra nếu không tìm thấy người dùng
        if (!user) {
            return res.status(404).json({ message: 'Người dùng không tồn tại' });
        }

        // Trả về thông tin người dùng nếu tìm thấy
        res.status(200).json(user);
    } catch (error) {
        // Xử lý lỗi nếu có
        res.status(500).json({ message: 'Đã xảy ra lỗi khi tìm người dùng', error: error.message });
    }
};

// Thêm một người dùng mới
export const createUser = async (req, res) => {
    const userData = req.body;
    try {
        const newUser = await userService.createUser(userData);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Cập nhật một người dùng
export const updateUser = async (req, res) => {
    const userId = req.params.id;
    const userData = req.body;

    // Kiểm tra nếu userData có chứa mật khẩu mới
    if (userData.password) {
        // Mã hóa mật khẩu mới
        userData.password = await bcrypt.hash(userData.password, 10);
    }

    try {
        const updatedUser = await userService.updateUser(userId, userData);
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Xóa một người dùng
export const deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const deletedUser = await userService.deleteUser(userId);
        res.json(deletedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Đăng ký
export const registerUser = async (req, res) => {
    const userData = req.body;
    try {
        // Kiểm tra xem người dùng có nhập đủ thông tin không
        if (!userData.username || !userData.email || !userData.password) {
            return res.status(400).json({ message: 'Chưa nhập đủ thông tin' });
        }

        // Kiểm tra xem người dùng đã đồng ý với điều khoản không
        if (!userData.agreedTerms) {
            return res.status(400).json({ message: 'Bạn chưa đồng ý với điều khoản' });
        }

        // Kiểm tra mật khẩu, phải có ít nhất 6 kí tự và không chứa kí tự đặc biệt
        const passwordRegex = /^[a-zA-Z0-9]{6,}$/;
        if (!passwordRegex.test(userData.password)) {
            return res.status(400).json({ message: 'Mật khẩu không đạt yêu cầu' });
        }

        // Lấy danh sách tất cả người dùng từ API
        const allUsers = await userService.getUsers();

        // Kiểm tra xem email người dùng nhập vào có trùng với bất kỳ email nào trong danh sách không
        const emailExists = allUsers.some(user => user.email === userData.email);
        if (emailExists) {
            return res.status(400).json({ message: 'Email đã tồn tại' });
        }

        // Hash mật khẩu
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        // Thêm một người dùng mới với mật khẩu đã hash và trường agreedTerms
        const newUser = await userService.createUser({
            ...userData,
            password: hashedPassword,
            agreedTerms: userData.agreedTerms,
        });

        // Tạo token JWT
        const token = jwt.sign({ userId: newUser._id, role: newUser.role }, 'your-secret-key', { expiresIn: '1h' });

        // Trả về thông tin người dùng và token
        res.status(201).json({
            user: {
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
            },
            token,
        });
    } catch (error) {
        console.error('Lỗi máy chủ nội bộ:', error);
        res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
    }
};


// Đăng nhập
export const loginUser = async (req, res) => {
    const loginData = req.body;

    try {
        // Kiểm tra xem đã nhập đủ thông tin không
        if (!loginData.email || !loginData.password) {
            return res.status(400).json({ message: 'Vui lòng nhập đủ thông tin' });
        }

        // Lấy danh sách tất cả người dùng từ API
        const allUsers = await userService.getUsers();

        // Tìm người dùng theo email
        const user = allUsers.find(user => user.email === loginData.email);

        // Kiểm tra xem người dùng có tồn tại không
        if (!user) {
            return res.status(400).json({ message: 'Sai email vui lòng kiểm tra lại' });
        }

        // So sánh mật khẩu đã hash
        const passwordMatch = await bcrypt.compare(loginData.password, user.password);

        // Kiểm tra xem mật khẩu có khớp không
        if (!passwordMatch) {
            return res.status(400).json({ message: 'Sai mật khẩu vui lòng kiểm tra lại' });
        }

        // Chuyển hướng dựa trên vai trò của người dùng và trả về thông tin người dùng và token
        const response = {
            loginData: {
                userId: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: jwt.sign({ userId: user._id, role: user.role }, 'your-secret-key', { expiresIn: '1h' })
            },

        };

        if (user.role === 'user') {
            response.redirectPath = '/';
        } else if (user.role === 'admin') {
            response.redirectPath = '/admin';
        }

        res.status(200).json(response);

    } catch (error) {
        console.error('Lỗi máy chủ nội bộ:', error);
        res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
    }
};


// // Cập nhật mã OTP cho người dùng dựa trên email
export const updateUserOTP = async (email, otp) => {
    try {
        const user = await User.findOneAndUpdate(
            { email },
            { otp },
            { new: true }
        );

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    } catch (error) {
        throw error;
    }
};

