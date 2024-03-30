import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../features/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State lưu trữ thông tin đăng ký
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    agreedTerms: false,
  });

  // Xử lý sự kiện thay đổi giá trị input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Xử lý sự kiện khi form được submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra điều kiện trước khi gửi yêu cầu đăng ký
    if (!formData.username || !formData.email || !formData.password) {
      toast.warning("Bạn chưa nhập đủ thông tin");
      return;
    }

    if (!formData.agreedTerms) {
      toast.warning("Bạn chưa đồng ý với điều khoản");
      return;
    }

    // Kiểm tra mật khẩu: ít nhất 6 kí tự và không chứa kí tự đặc biệt
    const passwordRegex = /^[a-zA-Z0-9]{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      toast.warning(
        "Mật khẩu phải có ít nhất 6 kí tự và không chứa kí tự đặc biệt"
      );
      return;
    }

    try {
      // Gửi yêu cầu đăng ký và kiểm tra email tồn tại
      await dispatch(registerUser(formData))
        .unwrap() // Chờ cho đến khi action hoàn thành và trả về giá trị
        .then((user) => {
          //Hiển thị thông báo thành công và chuyển hướng người dùng
          toast.success("Đăng ký thành công");

          // Xác định vai trò và chuyển hướng tương ứng
          if (user.role === "user" || !user.role) {
            navigate("/"); // Trang chủ cho người dùng
          }
        })
        .catch((error) => {
          // Xử lý lỗi và hiển thị thông báo tương ứng
          if (error.message === "Email đã tồn tại") {
            toast.warning("Email đã tồn tại");
          } else if (error.message === "Mật khẩu không hợp lệ") {
            toast.warning("Mật khẩu không hợp lệ");
          } else {
            toast.error("Đã có lỗi xảy ra");
          }
        });
    } catch (error) {
      // Xử lý lỗi và hiển thị thông báo tương ứng
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage);
      } else {
        toast.error("Đã có lỗi xảy ra");
      }
    }
  };

  return (
    <>
      {/* Component hiển thị thông báo */}

      {/* Phần header */}
      <section>
        <div className="w-full h-[49px] mx-auto mt-[92px] border-t border-[#EFEFF4]">
          <div className="text-[14px] leading-[49px] font-light px-[60px] ">
            <Link to="/" className="ml-[60px]">
              TRANG CHỦ
            </Link>
            <span> / TẠO TÀI KHOẢN</span>
          </div>
        </div>
      </section>

      {/* Phần form đăng ký */}
      <section>
        <div className="w-[1330px] h-[420px] mx-auto">
          <div className="w-[443px] h-[350px] mx-auto">
            <h1 className="text-[32px] font-bold text-center mb-5">ĐĂNG KÝ</h1>
            <form onSubmit={handleSubmit}>
              <div className="w-[413px] h-[250px]">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Họ và tên"
                  className="w-[413px] h-[30px] border border-[#e7e7e7] py-[8px] px-[10px] outline-none mb-4 rounded"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-[413px] h-[30px] border border-[#e7e7e7] py-[8px] px-[10px] outline-none mb-4 rounded"
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Mật khẩu"
                  className="w-[413px] h-[30px] border border-[#e7e7e7] py-[8px] px-[10px] outline-none mb-4 rounded"
                />
                <input
                  type="checkbox"
                  name="agreedTerms"
                  checked={formData.agreedTerms}
                  onChange={handleChange}
                  className="w-[12px] h-[12px] mr-2"
                />
                <p className="inline-block text-[14px] font-normal">
                  Tôi đồng ý với các
                  <strong className="text-blue-600 cursor-pointer mx-1">
                    điều khoản
                  </strong>
                  của NEM
                </p>
                <button
                  type="submit"
                  className="w-[413px] h-[42px] mx-auto border mt-5 bg-[#070707] text-white hover:opacity-80 duration-300 ease-in-out rounded"
                >
                  ĐĂNG KÝ
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
