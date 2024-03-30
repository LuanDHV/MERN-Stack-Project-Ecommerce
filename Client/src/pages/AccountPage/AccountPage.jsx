import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

// Trang Đăng Nhập
export default function AccountPage() {
  const user = useSelector((state) => state.user.user);

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
        <div className="w-[1330px] h-[300px] mx-auto my-10">
          <div className=" grid grid-flow-col">
            <div className="w-[400px] h-[200px] pl-[30px]">
              <div className="p-4">
                <p className="mb-5 text-[28px]">
                  Xin Chào
                  <span className="block font-bold text-[32px]">
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

            <div className="w-[930px] h-auto border-l-2 p-4 mt-20">
              <div className="pl-[30px] text-gray-600 text-[14px]">
                <p className="mb-2 ">Họ tên</p>
                <div className="w-[500px] h-[40px] border px-4 leading-[40px] mb-2 bg-[#EFEFF4] cursor-not-allowed ">
                  {user.username}
                </div>
                <p className="mb-2">Email</p>
                <div className="w-[500px] h-[40px] border px-4 leading-[40px] mb-2 bg-[#EFEFF4] cursor-not-allowed">
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
