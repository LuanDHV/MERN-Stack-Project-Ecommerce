// Header.js
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faUser,
  faMagnifyingGlass,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../features/category/categorySlice";
import { logoutUser } from "../features/user/userSlice";
import slugify from "slugify";
import useCurrencyFormatter from "../hooks/useCurrencyFormatter";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Header() {
  // Dispatch để gọi các action từ Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Lấy danh sách danh mục từ store
  const categories = useSelector((state) => state.categories.items);
  const status = useSelector((state) => state.categories.status);

  // Lấy thông tin người dùng từ store
  const user = useSelector((state) => state.user.user);

  // Lấy thông tin giỏ hàng từ store
  const cart = useSelector((state) => state.cart);

  // Định dạng tiền tệ
  const { formatCurrency } = useCurrencyFormatter();

  // Xử lý đăng xuất
  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("Đăng xuất thành công");
    // Chuyển hướng tới trang home sau khi đăng xuất
    navigate("/");
  };

  const handleCheckout = () => {
    // Kiểm tra nếu giỏ hàng trống
    if (cart.items.length === 0) {
      toast.warning("Vui lòng thêm sản phẩm");
      // Ngăn chặn chuyển hướng tới trang thanh toán
      return;
    }

    // Thực hiện logic thanh toán nếu giỏ hàng có sản phẩm
    navigate("/checkout");
  };

  // Chuyển đổi một chuỗi văn bản thành định dạng slug (category)
  const convertToSlug = (text) =>
    slugify(text.replace(/Đ/g, "D"), { lower: true });

  // Sử dụng useEffect để gọi action fetchCategories
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  return (
    <>
      {/* Header */}
      <section>
        <div className="w-full h-[92px] py-[15px] bg-white fixed top-0 z-50">
          <div className="w-[1330px] h-[62px] mx-auto grid grid-flow-col auto-cols-max justify-between text-[#07070780]">
            {/* Logo */}
            <h1 className="place-self-center w-[191px]">
              <Link to="/">
                <img
                  className="max-w-max pl-[30px]"
                  src="https://theme.hstatic.net/200000182297/1000887316/14/logo.png?v=1068"
                  alt=""
                />
              </Link>
            </h1>

            {/* Danh mục */}
            <div className="place-self-center">
              <ul className="flex font-bold">
                {categories.map((category, index) => {
                  const isFirstItem = index === 0 || index === 3 || index === 4;

                  return (
                    <li
                      key={category._id}
                      className={`relative group${
                        isFirstItem ? " no-icon" : ""
                      }`}
                    >
                      <Link
                        to={`/danh-muc/${convertToSlug(category.name)}`}
                        className="block mr-4 hover:text-black transition duration-300 ease-in-out"
                      >
                        {category.name}
                        {!isFirstItem && (
                          <FontAwesomeIcon
                            icon={faCaretDown}
                            className="ml-2"
                          />
                        )}
                      </Link>

                      {/* Hiển thị danh sách danh mục con */}
                      {category.children && category.children[0] !== null && (
                        <ul
                          className="w-[185px] absolute hidden group-hover:block bg-white border border-gray-300 rounded
                        duration-300 ease-in-out"
                        >
                          {category.children.map((subcategory) => (
                            <li
                              key={subcategory._id}
                              className="relative group"
                            >
                              <Link
                                to={`/danh-muc/${convertToSlug(
                                  category.name
                                )}/${convertToSlug(subcategory.name)}`}
                                className="block py-[15px] px-[15px] hover:bg-gray-100 hover:text-black 
                                duration-300 ease-in-out"
                              >
                                {subcategory.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Tìm kiếm, Người dùng, Giỏ hàng */}
            <div className="place-self-center text-[#070707]">
              <ul className="flex ">
                {/* Tìm kiếm */}
                <li className="px-2 relative group">
                  <a className="block" href="">
                    <FontAwesomeIcon
                      icon={faMagnifyingGlass}
                      className="h-[15px] w-[15px] mr-2"
                    />
                  </a>
                  <ul className="w-[200px] h-[40px] absolute hidden group-hover:block bg-white border border-gray-300 rounded-md">
                    <form
                      action=""
                      className="grid grid-flow-col auto-cols-max"
                    >
                      <input
                        type="search"
                        placeholder="Tìm kiếm..."
                        className="w-[200px] h-[40px] px-2 outline-none rounded-bl-md border"
                      />
                      <button
                        type="submit"
                        className="w-[40px] h-[40px] text-center text-white bg-black"
                      >
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                      </button>
                    </form>
                  </ul>
                </li>

                {/* Người dùng */}
                <li className="border-l border-[#7c7c7c] px-2 relative group cursor-pointer">
                  {user ? (
                    <>
                      <span className="block">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="h-[15px] w-[15px] mr-2"
                        />
                        {user.username}
                      </span>
                      <ul className="w-[185px] absolute hidden group-hover:block bg-white border border-gray-300 rounded">
                        <li>
                          <Link
                            to="account"
                            className="w-full block py-[15px] px-[15px] hover:bg-gray-100"
                          >
                            Thông tin tài khoản
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="account-order"
                            className="w-full block py-[15px] px-[15px] hover:bg-gray-100"
                          >
                            Đơn hàng của bạn
                          </Link>
                        </li>
                        <li>
                          <a
                            onClick={handleLogout}
                            className="w-full block py-[15px] px-[15px] hover:bg-gray-100"
                          >
                            Đăng xuất
                          </a>
                        </li>
                      </ul>
                    </>
                  ) : (
                    <>
                      <a className="block" href="#">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="h-[15px] w-[15px] mr-2"
                        />
                        Tài khoản
                      </a>
                      <ul className="w-[185px] absolute hidden group-hover:block bg-white border border-gray-300 rounded">
                        <li>
                          <Link
                            to="/dang-nhap"
                            className="block py-[15px] px-[15px] hover:bg-gray-100"
                          >
                            Đăng nhập
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dang-ky"
                            className="block py-[15px] px-[15px] hover:bg-gray-100"
                          >
                            Đăng ký
                          </Link>
                        </li>
                      </ul>
                    </>
                  )}
                </li>

                {/* Giỏ hàng */}
                <li className="border-l border-[#7c7c7c] px-2 relative group">
                  <Link to="/cart" className="block">
                    <FontAwesomeIcon
                      icon={faCartShopping}
                      className="h-[15px] w-[15px] mr-2"
                    />
                    Giỏ hàng
                    <span className="ml-2 inline-block bg-black text-white px-3 rounded-full">
                      {cart.totalItems}
                    </span>
                  </Link>
                  <ul
                    className="w-[320px] absolute right-3 hidden group-hover:block bg-white border border-gray-300 rounded
                   overflow-y-auto max-h-[600px]"
                  >
                    <div className="w-full h-[30px] bg-[#070707] text-white">
                      <span className="p-4 text-[14px] leading-[30px]">
                        Giỏ Hàng Của Tôi
                      </span>
                    </div>
                    {cart.items.length === 0 ? (
                      <li>
                        <a className="block py-[15px] px-[15px]" href="#">
                          Bạn chưa có sản phẩm nào trong giỏ hàng !
                        </a>
                      </li>
                    ) : (
                      // Hiển thị danh sách sản phẩm trong giỏ hàng
                      cart.items.map((item) => (
                        <li key={item._id} className="p-4">
                          <div className="grid grid-flow-col text-[14px]">
                            <div className="w-[67px] h-[100px]">
                              <img src={item.images[0]} alt="" />
                            </div>
                            <div className="w-[200px]">
                              <p className="cursor-default">{item.name}</p>
                              <p className="cursor-default">
                                {`Size ${item.selectedSize} / ${item.colors}`}
                              </p>
                              <p className="cursor-default">
                                Giá/SP: {formatCurrency(item.price)}
                              </p>

                              <p className="cursor-default">
                                SL: {item.quantity}
                              </p>
                              <p className="font-bold float-end cursor-default">
                                <span>Tổng:</span>
                                <span className="ml-1">
                                  {formatCurrency(item.totalPrice)}
                                </span>
                              </p>
                            </div>
                          </div>
                        </li>
                      ))
                    )}
                    <div className="">
                      <li className="p-4 cursor-default">
                        <p className="font-bold h-[20px]">
                          <span className="float-start">THÀNH TIỀN:</span>
                          <span className="float-end">
                            {formatCurrency(cart.totalCartPrice)}
                          </span>
                        </p>
                      </li>
                      <div className="p-2">
                        <button
                          className="w-full h-[36px] bg-[#070707] text-[#ffffff] mb-2
                        hover:opacity-85 duration-300 ease-in-out rounded"
                          onClick={handleCheckout}
                        >
                          THANH TOÁN NGAY
                        </button>
                        <button
                          className="w-full h-[36px] bg-[#ffffff] text-[#070707] mb-2 border border-[#070707] 
                        hover:bg-gray-200 duration-300 ease-in-out rounded"
                        >
                          <Link to="/cart">XEM GIỎ HÀNG</Link>
                        </button>
                      </div>
                    </div>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
