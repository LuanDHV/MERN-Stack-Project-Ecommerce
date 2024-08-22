import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../features/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../../features/user/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Trang Đăng Nhập
export default function LogInPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State cho dữ liệu đăng nhập
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Xử lý sự kiện thay đổi giá trị của input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Xử lý sự kiện đăng nhập
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra điều kiện trước khi gửi yêu cầu đăng nhập
    if (!formData.email || !formData.password) {
      toast.warning("Bạn chưa nhập đủ thông tin");
      return;
    }

    try {
      // Dispatch action đăng nhập và đợi nó hoàn thành
      await dispatch(loginUser(formData))
        .unwrap() // Chờ cho đến khi action hoàn thành và trả về giá trị
        .then((user) => {
          // Cập nhật thông tin người dùng trong Redux store
          dispatch(setUser(user));

          //Hiển thị thông báo đăng nhập thành công
          toast.success("Đăng nhập thành công");

          // Xác định vai trò của người dùng và chuyển hướng tương ứng
          if (user.role === "user" || !user.role) {
            navigate("/"); // Trang home cho người dùng
          } else if (user.role === "admin") {
            navigate("/admin"); // Trang admin cho admin
          }
        })
        .catch((error) => {
          // Xử lý lỗi nếu có
          if (error.message === "Sai email vui lòng kiểm tra lại") {
            toast.warning("Sai email vui lòng kiểm tra lại");
          } else if (error.message === "Sai mật khẩu vui lòng kiểm tra lại") {
            toast.warning("Sai mật khẩu vui lòng kiểm tra lại");
          } else {
            toast.error("Đã có lỗi xảy ra");
          }
        });
    } catch (error) {
      // Xử lý lỗi nếu có
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
      {/* Hiển thị thông báo */}

      {/* Đường dẫn trang */}
      <section>
        <div className="mx-auto mt-24 h-12 w-full border-t border-[#EFEFF4]">
          <div className="mx-auto w-5/6 text-sm font-light">
            <Link to="/" className="">
              TRANG CHỦ
            </Link>
            <span> / ĐĂNG NHẬP </span>
          </div>
        </div>
      </section>

      {/* Form Đăng Nhập */}
      <section>
        <div className="mx-auto h-auto w-full">
          <h1 className="my-5 text-center text-3xl font-bold">ĐĂNG NHẬP</h1>
          <div className="mx-auto h-auto w-[420px] p-5">
            <form onSubmit={handleSubmit}>
              {/* Input Email */}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="mb-4 h-auto w-full rounded border border-[#e7e7e7] px-3 py-2 outline-none"
              />
              {/* Input Password */}
              <input
                type="password"
                name="password"
                placeholder="Mật khẩu"
                value={formData.password}
                onChange={handleChange}
                className="mb-4 h-auto w-full rounded border border-[#e7e7e7] px-3 py-2 outline-none"
              />
              {/* Nút Đăng Nhập */}
              <span className="float-end mx-1 mb-2 cursor-pointer text-blue-600">
                <Link to="/reset"> Quên mật khẩu </Link>
              </span>
              <button className="mx-auto h-10 w-full rounded border bg-[#070707] text-white duration-300 ease-in-out hover:opacity-80">
                ĐĂNG NHẬP
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
