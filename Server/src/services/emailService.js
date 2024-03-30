// services/emailService.js
import nodemailer from "nodemailer";
import { config } from 'dotenv';
config()


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: 'ssl',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export const sendOrderConfirmationEmail = (to, orderId, orderData) => {
    const productsHTML = Array.isArray(orderData.products)
        ? orderData.products.map(product => `
        <div>
            <img src="${product.images[0]}" alt="${product.name}" style="max-width: 100px; max-height: 100px;">
            <p><strong>${product.name}</strong></p>
            <p>Giá: ${product.price}</p>
            <p>Giảm giá: ${product.discount}</p>
            <p>Màu sắc: ${product.colors.join(', ')}</p>
            <p>Size: ${product.selectedSize}</p>
            <p>Số lượng: ${product.quantity}</p>
            <p>Tổng giá: ${product.totalPrice}</p>
        </div>
    `).join('')
        : '';
    const mailOptions = {
        from: '"NEM FASHION" lts.volm@gmail.com',
        to,
        subject: `Thông báo xác nhận đơn hàng #${orderId}`,
        html: `
            <p>NEM FASHION</p>
            <p>Cảm ơn bạn đã mua hàng! Đơn hàng #${orderId} đã được đặt thành công.</p>
            <p>Họ và tên: ${orderData.fullName}</p>
            <p>Email: ${orderData.email}</p>
            <p>Số điện thoại: ${orderData.phoneNumber}</p>
            <p>Địa chỉ: ${orderData.address}</p>
            <p>Phương thức thanh toán: ${orderData.payment}</p>
            <p>Thông tin đơn hàng</p>
            ${productsHTML}
        `,
    };

    return transporter.sendMail(mailOptions);
};


export const sendOTPEmail = (to, otp) => {
    const mailOptions = {
        from: '"NEM FASHION" lts.volm@gmail.com',
        to,
        subject: "OTP ĐẶT LẠI MẬT KHẨU",
        html: `<p> Mã OTP của bạn là: ${otp}</p>`,
    };

    return transporter.sendMail(mailOptions);
};


