import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userService from "../../services/userService";

// Trang Đăng Nhập
export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // State cho dữ liệu đăng nhập
  const [formData, setFormData] = useState({
    email: new URLSearchParams(location.search).get("email") || "",
    otp: "",
    password: "",
    password2: "",
  });

  // Xử lý sự kiện thay đổi giá trị của input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Xử lý sự kiện
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.otp || !formData.password || !formData.password2) {
      toast.warning("Bạn chưa nhập đủ thông tin");
      return;
    }

    try {
      // Kiểm tra xem mật khẩu mới và mật khẩu nhập lại có khớp nhau không
      if (formData.password !== formData.password2) {
        toast.error("Mật khẩu mới không khớp");
        return;
      }

      // Kiểm tra mật khẩu: ít nhất 6 kí tự và không chứa kí tự đặc biệt
      const passwordRegex = /^[a-zA-Z0-9]{6,}$/;
      if (!passwordRegex.test(formData.password)) {
        toast.warning(
          "Mật khẩu phải có ít nhất 6 kí tự và không chứa kí tự đặc biệt",
        );
        return;
      }
      // Kiểm tra OTP có khớp với OTP đã gửi đi không
      const otpMatch = await userService.verifyOTP(
        formData.email,
        formData.otp,
      );

      if (!otpMatch) {
        toast.error("Mã OTP không hợp lệ");
        return;
      }

      // Thực hiện yêu cầu đặt lại mật khẩu
      const response = await userService.resetPassword(
        formData.email,
        formData.otp,
        formData.password,
        formData.password2,
      );

      // Hiển thị thông báo thành công và chuyển hướng
      toast.success(response.message);
      navigate("/dang-nhap");
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("Có lỗi xảy ra khi đặt lại mật khẩu");
    }
  };

  return (
    <>
      <section>
        <div className="mx-auto mt-20 h-12 w-full overflow-x-hidden border-t border-[#EFEFF4]">
          <div className="mx-auto w-5/6 text-sm font-light">
            <Link to="/" className="">
              TRANG CHỦ
            </Link>
            <span> /TÀI KHOẢN</span>
          </div>
        </div>
      </section>
      <section>
        <div className="mx-auto h-auto w-full">
          <h1 className="my-5 text-center text-3xl font-bold">
            ĐẶT LẠI MẬT KHẨU
          </h1>
          <div className="h-auto w-full p-5">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="email"
                placeholder="Nhập email"
                value={formData.email}
                onChange={handleChange}
                className="mb-4 h-auto w-full border border-[#e7e7e7] px-3 py-2 outline-none"
              />
              <input
                type="text"
                name="otp"
                placeholder="Nhập mã OTP"
                onChange={handleChange}
                className="mb-4 h-auto w-full border border-[#e7e7e7] px-3 py-2 outline-none"
              />
              <input
                type="password"
                name="password"
                placeholder="Nhập mật khẩu mới"
                onChange={handleChange}
                className="mb-4 h-auto w-full border border-[#e7e7e7] px-3 py-2 outline-none"
              />
              <input
                type="password"
                name="password2"
                placeholder="Nhập lại mật khẩu mới"
                onChange={handleChange}
                className="mb-4 h-auto w-full border border-[#e7e7e7] px-3 py-2 outline-none"
              />
              <button className="mx-auto h-10 w-full border bg-[#070707] text-white duration-300 ease-in-out hover:opacity-80">
                XÁC NHẬN
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
