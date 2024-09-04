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
            KHÔI PHỤC MẬT KHẨU
          </h1>
          <div className="mx-auto h-auto w-full p-5 md:w-[420px]">
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
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
