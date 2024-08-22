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
      <div className="fixed h-screen w-[15%] border-r bg-white py-4">
        <h1 className="h-[50px] px-5">
          <Link to="/">
            <img
              src="https://theme.hstatic.net/200000182297/1000887316/14/logo.png?v=1068"
              alt=""
            />
          </Link>
        </h1>
        <div className="grid grid-flow-row">
          <div className="cursor-pointer px-8 py-4 font-bold text-[#6B7280]">
            <ul className="">
              <li className="py-4 duration-300 ease-in-out hover:text-[#10B981]">
                <FontAwesomeIcon icon={faHouse} className="mr-2" />
                <Link to="/admin">Trang chủ</Link>
              </li>
              <li className="py-4">
                <div
                  className="duration-300 ease-in-out hover:text-[#10B981]"
                  onClick={toggleSubMenu}
                >
                  <FontAwesomeIcon icon={faList} className="mr-2" />
                  Danh mục
                  <FontAwesomeIcon icon={faCaretRight} className="ml-2" />
                </div>
                {isSubMenuVisible && (
                  <ul className="p-2 text-sm font-normal">
                    <li className="py-2 duration-300 ease-in-out hover:text-[#10B981]">
                      Danh mục 1
                    </li>
                    <li className="py-2 duration-300 ease-in-out hover:text-[#10B981]">
                      Danh mục 2
                    </li>
                    <li className="py-2 duration-300 ease-in-out hover:text-[#10B981]">
                      Danh mục 3
                    </li>
                    <li className="py-2 duration-300 ease-in-out hover:text-[#10B981]">
                      Danh mục 4
                    </li>
                    <li className="py-2 duration-300 ease-in-out hover:text-[#10B981]">
                      Danh mục 5
                    </li>
                  </ul>
                )}
              </li>
              <li className="py-4 duration-300 ease-in-out hover:text-[#10B981]">
                <FontAwesomeIcon icon={faShop} className="mr-2" />
                <Link to="/admin/danh-muc/san-pham"> Sản Phẩm</Link>
              </li>
              <li className="py-4 duration-300 ease-in-out hover:text-[#10B981]">
                <FontAwesomeIcon icon={faUsers} className="mr-2" />
                <Link to="/admin/danh-muc/khach-hang">Khách hàng</Link>
              </li>
              <li className="py-4 duration-300 ease-in-out hover:text-[#10B981]">
                <FontAwesomeIcon icon={faCompass} className="mr-2" />
                <Link to="/admin/danh-muc/don-hang">Đơn hàng</Link>
              </li>
              <li className="py-4 duration-300 ease-in-out hover:text-[#10B981]">
                <FontAwesomeIcon icon={faUserGear} className="mr-2" />
                <Link to="/admin/danh-muc/quan-tri-vien"> Quản trị viên</Link>
              </li>
            </ul>
            {user && user.role === "admin" ? (
              <li className="list-none py-4 duration-300 ease-in-out hover:text-[#10B981]">
                <button
                  className="flex items-center rounded-md bg-[#10B981] px-4 py-2 text-white hover:bg-[#059669]"
                  onClick={handleLogout}
                >
                  <FontAwesomeIcon
                    icon={faArrowRightFromBracket}
                    className="mr-2"
                  />
                  Đăng xuất
                </button>
              </li>
            ) : (
              <li className="list-none py-4 duration-300 ease-in-out hover:text-[#10B981]">
                <button className="flex items-center rounded-md bg-[#10B981] px-4 py-2 text-white hover:bg-[#059669]">
                  <FontAwesomeIcon
                    icon={faArrowRightFromBracket}
                    className="mr-2"
                  />
                  Đăng xuất
                </button>
              </li>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// text-[#10B981] focus
