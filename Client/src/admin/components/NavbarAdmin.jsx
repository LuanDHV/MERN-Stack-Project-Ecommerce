import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faCaretRight,
  faCompass,
  faHouse,
  faList,
  faShop,
  faUserGear,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../features/user/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NavbarAdmin() {
  // Dispatch để gọi các action từ Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);

  const toggleSubMenu = () => {
    setIsSubMenuVisible(!isSubMenuVisible);
  };

  // Lấy thông tin người dùng từ store
  const user = useSelector((state) => state.user.user);

  // Xử lý đăng xuất
  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("Đăng xuất thành công");
    // Chuyển hướng tới trang home sau khi đăng xuất
    navigate("/dang-nhap");
  };

  return (
    <>
      <div className="fixed h-screen w-1/6 border-r bg-white">
        <h1 className="my-5 px-2">
          <Link to="/">
            <img
              src="https://theme.hstatic.net/200000182297/1000887316/14/logo.png?v=1068"
              alt=""
              className="mx-auto object-cover"
            />
          </Link>
        </h1>
        <div className="grid grid-flow-row">
          <div className="mt-5 grid cursor-pointer justify-items-center font-bold text-[#6B7280] md:px-5">
            <ul className="grid gap-5">
              <li className="flex py-4 duration-300 ease-in-out hover:text-[#10B981]">
                <Link to="/admin" className="flex items-center">
                  <FontAwesomeIcon icon={faHouse} />
                  <span className="ml-2 hidden text-lg md:block">
                    Trang chủ
                  </span>
                </Link>
              </li>
              <li className="flex py-4 duration-300 ease-in-out hover:text-[#10B981]">
                <Link
                  to="/admin/danh-muc/san-pham"
                  className="flex items-center"
                >
                  <FontAwesomeIcon icon={faShop} />
                  <span className="ml-2 hidden text-lg md:block">Sản Phẩm</span>
                </Link>
              </li>
              <li className="flex py-4 duration-300 ease-in-out hover:text-[#10B981]">
                <Link
                  to="/admin/danh-muc/khach-hang"
                  className="flex items-center"
                >
                  <FontAwesomeIcon icon={faUsers} />
                  <span className="ml-2 hidden text-lg md:block">
                    Khách hàng
                  </span>
                </Link>
              </li>

              <li className="flex py-4 duration-300 ease-in-out hover:text-[#10B981]">
                <Link
                  to="/admin/danh-muc/don-hang"
                  className="flex items-center"
                >
                  <FontAwesomeIcon icon={faCompass} />
                  <span className="ml-2 hidden text-lg md:block">Đơn hàng</span>
                </Link>
              </li>

              <li className="flex py-4 duration-300 ease-in-out hover:text-[#10B981]">
                <Link
                  to="/admin/danh-muc/quan-tri-vien"
                  className="flex items-center"
                >
                  <FontAwesomeIcon icon={faUserGear} />
                  <span className="ml-2 hidden text-lg md:block">
                    Quản trị viên
                  </span>
                </Link>
              </li>
            </ul>

            {user && user.role === "admin" ? (
              <li className="absolute bottom-0 mx-auto list-none py-4 duration-300 ease-in-out hover:text-[#10B981]">
                <button
                  className="flex items-center rounded-md bg-[#10B981] px-4 py-2 text-white hover:bg-[#059669]"
                  onClick={handleLogout}
                >
                  <FontAwesomeIcon icon={faArrowRightFromBracket} />
                  <p className="ml-2 hidden text-lg md:block"> Đăng xuất</p>
                </button>
              </li>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

// text-[#10B981] focus
