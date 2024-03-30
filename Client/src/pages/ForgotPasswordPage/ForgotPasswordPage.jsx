import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailService from "../../services/emailService";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  // State cho dữ liệu đăng nhập
  const [formData, setFormData] = useState({
    email: "",
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

    if (!formData.email) {
      toast.warning("Bạn chưa nhập đủ thông tin");
      return;
    }

    try {
      // Gửi mã OTP và nhận mã OTP từ backend
      await emailService.sendOTP(formData.email);
      toast.success("Mã OTP đã được gửi thành công");
      navigate(`/reset-2?email=${encodeURIComponent(formData.email)}`);
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Có lỗi xảy ra khi gửi OTP");
    }
  };

  return (
    <>
      <section>
        <div className="w-full h-[49px] mx-auto mt-[92px] border-t border-[#EFEFF4]">
          <div className="text-[14px] leading-[49px] font-light px-[60px] ">
            <Link to="/" className="ml-[60px]">
              TRANG CHỦ
            </Link>
            <span> /TÀI KHOẢN</span>
          </div>
        </div>
      </section>
      <section>
        <div className="w-[1330px] h-[420px] mx-auto">
          <div className="w-[443px] h-[350px] mx-auto">
            <h1 className="text-[32px] font-bold text-center mb-10 mr-10">
              KHÔI PHỤC MẬT KHẨU
            </h1>
            <div className="w-[413px] h-[100px]">
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-[413px] h-[30px] border border-[#e7e7e7] py-[8px] px-[10px] outline-none mb-4"
                />
                <button className="w-[413px] h-[42px] mx-auto border bg-[#070707] text-white hover:opacity-80 duration-300 ease-in-out">
                  XÁC NHẬN
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
