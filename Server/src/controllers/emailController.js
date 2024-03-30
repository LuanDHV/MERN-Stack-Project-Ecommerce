// emailController.js

import * as emailService from '../services/emailService.js';
import * as userController from '../controllers/userController.js';
import crypto from 'crypto';

const generateOTP = () => {
    // Tạo một chuỗi ngẫu nhiên có độ dài 6 kí tự
    const otp = crypto.randomBytes(3).toString('hex').toUpperCase();
    return otp;
};


export const sendOTPEmailController = async (req, res) => {
    try {
        const { to } = req.body;
        const otp = generateOTP();

        // Gửi email chứa OTP
        await emailService.sendOTPEmail(to, otp);

        // Cập nhật mã OTP vào cơ sở dữ liệu người dùng
        await userController.updateUserOTP(to, otp); // Thêm mã OTP vào cơ sở dữ liệu người dùng

        res.status(200).json({ message: 'OTP email sent successfully' });
    } catch (error) {
        console.error('Error sending OTP email:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
