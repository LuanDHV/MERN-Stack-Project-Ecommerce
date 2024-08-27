import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

// Trang Đăng Nhập
export default function AccountPage() {
  const user = useSelector((state) => state.user.user);

  return (
    <>
      <section>
        <div className="mx-auto mt-20 h-12 w-full border-t border-[#EFEFF4]">
          <div className="mx-auto w-5/6 text-sm font-light">
            <Link to="/" className="">
              TRANG CHỦ
            </Link>
            <span> /TÀI KHOẢN</span>
          </div>
        </div>
      </section>
      <section>
        <div className="mx-auto my-10 h-auto w-full">
          <div className="grid grid-flow-row xl:grid-flow-col">
            <div className="mx-auto h-auto w-5/6">
              <div className="p-4 text-center">
                <p className="mb-5 text-2xl">
                  Xin Chào
                  <span className="block text-3xl font-bold">
                    {user.username}
                  </span>
                </p>
                <ul>
                  <li className="text-gray-600">
                    <Link to="/account">Thông tin tài khoản</Link>
                  </li>
                  <li className="text-gray-600">
                    <Link to="/account-order">Quản lí đơn hàng</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="h-auto w-full border-l-2 p-4 xl:mt-20">
              <div className="mx-auto w-5/6 text-sm text-gray-600">
                <p className="mb-2">Họ tên</p>
                <div className="mb-2 flex h-10 w-full cursor-not-allowed items-center border bg-[#EFEFF4] px-4">
                  {user.username}
                </div>
                <p className="mb-2">Email</p>
                <div className="mb-2 flex h-10 w-full cursor-not-allowed items-center border bg-[#EFEFF4] px-4">
                  {user.email}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
