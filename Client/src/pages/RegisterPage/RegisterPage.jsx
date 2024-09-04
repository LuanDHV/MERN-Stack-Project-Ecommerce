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
        "Mật khẩu phải có ít nhất 6 kí tự và không chứa kí tự đặc biệt",
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
        <div className="mx-auto mt-20 h-12 w-full overflow-x-hidden border-t border-[#EFEFF4]">
          <div className="mx-auto w-5/6 text-sm font-light">
            <Link to="/" className="">
              TRANG CHỦ
            </Link>
            <span> / TẠO TÀI KHOẢN</span>
          </div>
        </div>
      </section>

      {/* Phần form đăng ký */}
      <section>
        <div className="mx-auto h-auto w-full">
          <h1 className="my-5 text-center text-3xl font-bold">ĐĂNG KÝ</h1>
          <div className="mx-auto h-auto w-full p-5 md:w-[420px]">
            <form onSubmit={handleSubmit}>
              {/* Input Username */}
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Họ và tên"
                className="mb-4 h-auto w-full rounded border border-[#e7e7e7] px-3 py-2 outline-none"
              />
              {/* Input Email */}
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="mb-4 h-auto w-full rounded border border-[#e7e7e7] px-3 py-2 outline-none"
              />
              {/* Input Password */}
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mật khẩu"
                className="mb-4 h-auto w-full rounded border border-[#e7e7e7] px-3 py-2 outline-none"
              />
              {/* Checkbox */}
              <input
                type="checkbox"
                name="agreedTerms"
                checked={formData.agreedTerms}
                onChange={handleChange}
                className="mr-2 h-3 w-3"
              />
              <p className="inline-block text-sm font-normal">
                Tôi đồng ý với các
                <strong className="mx-1 cursor-pointer text-blue-600">
                  điều khoản
                </strong>
                của NEM
              </p>
              {/* Nút Đăng Ký */}
              <button
                type="submit"
                className="mx-auto mt-5 h-10 w-full rounded border bg-[#070707] text-white duration-300 ease-in-out hover:opacity-80"
              >
                ĐĂNG KÝ
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
