// userService.js
import axios from "axios";

const API_URL = "http://localhost:8000/api/users";

const userService = {
  getUsers: () => axios.get(API_URL),
  getUserById: (userId) => axios.get(`${API_URL}/${userId}`),
  getUserByEmail: (email) => axios.get(`${API_URL}/email/${email}`),
  createUser: (userData) => axios.post(`${API_URL}/register`, userData),
  updateUser: (userId, userData) => axios.put(`${API_URL}/${userId}`, userData),
  deleteUser: (userId) => axios.delete(`${API_URL}/${userId}`),
  loginUser: (userData) => axios.post(`${API_URL}/login`, userData),
  verifyOTP: async (email, otp) => {
    try {
      const response = await userService.getUserByEmail(email);
      if (!response || !response.data) {
        return false;
      }
      const user = response.data;
      if (!user.otp || user.otp !== otp) {
        return false;
      }
      const otpMatch = otp === user.otp;
      return otpMatch;
    } catch (error) {
      console.error("Lỗi khi xác thực OTP:", error);
      throw error;
    }
  },

  resetPassword: async (email, otp, newPassword, newPassword2) => {
    // Kiểm tra xem mật khẩu mới và mật khẩu nhập lại có khớp nhau không
    if (newPassword !== newPassword2) {
      throw new Error("Mật khẩu không giống nhau");
    }

    // Lấy thông tin người dùng từ server bằng email
    const response = await userService.getUserByEmail(email);
    const user = response.data;

    // Kiểm tra xem người dùng và OTP
    if (!user || user.otp !== otp) {
      throw new Error("Email hoặc mã OTP không hợp lệ");
    }

    // Gửi yêu cầu cập nhật mật khẩu mới đến server
    await userService.updateUser(user._id, { password: newPassword, otp: "" });

    // Trả về thông báo thành công nếu mọi thứ diễn ra đúng
    return { message: "Mật khẩu đã được đặt lại thành công" };
  },
};

export default userService;
