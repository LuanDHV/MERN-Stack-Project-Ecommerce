// Header.js
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faUser,
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
        <div className="fixed top-0 z-50 h-[92px] w-full bg-white py-[15px]">
          <div className="mx-auto grid h-[62px] w-full auto-cols-max grid-flow-col justify-between text-[#07070780]">
            {/* Logo */}
            <h1 className="w-[191px] place-self-center">
              <Link to="/">
                <img
                  className="max-w-max"
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
                        isFirstItem ? "no-icon" : ""
                      }`}
                    >
                      <Link
                        to={`/danh-muc/${convertToSlug(category.name)}`}
                        className="mr-4 block transition duration-300 ease-in-out hover:text-black"
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
                        <ul className="absolute hidden w-[185px] rounded border border-gray-300 bg-white duration-300 ease-in-out group-hover:block">
                          {category.children.map((subcategory) => (
                            <li
                              key={subcategory._id}
                              className="group relative"
                            >
                              <Link
                                to={`/danh-muc/${convertToSlug(
                                  category.name,
                                )}/${convertToSlug(subcategory.name)}`}
                                className="block px-[15px] py-[15px] duration-300 ease-in-out hover:bg-gray-100 hover:text-black"
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

            {/*Người dùng, Giỏ hàng */}
            <div className="place-self-center text-[#070707]">
              <ul className="flex">
                {/* Người dùng */}
                <li className="group relative cursor-pointer px-2">
                  {user ? (
                    <>
                      <span className="block">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="mr-2 h-[15px] w-[15px]"
                        />
                        {user.username}
                      </span>
                      <ul className="absolute hidden w-[185px] rounded border border-gray-300 bg-white group-hover:block">
                        <li>
                          <Link
                            to="account"
                            className="block w-full px-[15px] py-[15px] hover:bg-gray-100"
                          >
                            Thông tin tài khoản
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="account-order"
                            className="block w-full px-[15px] py-[15px] hover:bg-gray-100"
                          >
                            Đơn hàng của bạn
                          </Link>
                        </li>
                        <li>
                          <a
                            onClick={handleLogout}
                            className="block w-full px-[15px] py-[15px] hover:bg-gray-100"
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
                          className="mr-2 h-[15px] w-[15px]"
                        />
                        Tài khoản
                      </a>
                      <ul className="absolute hidden w-[185px] rounded border border-gray-300 bg-white group-hover:block">
                        <li>
                          <Link
                            to="/dang-nhap"
                            className="block px-[15px] py-[15px] hover:bg-gray-100"
                          >
                            Đăng nhập
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/dang-ky"
                            className="block px-[15px] py-[15px] hover:bg-gray-100"
                          >
                            Đăng ký
                          </Link>
                        </li>
                      </ul>
                    </>
                  )}
                </li>

                {/* Giỏ hàng */}
                <li className="group relative border-l border-[#7c7c7c] px-2">
                  <Link to="/cart" className="block">
                    <FontAwesomeIcon
                      icon={faCartShopping}
                      className="mr-2 h-[15px] w-[15px]"
                    />
                    Giỏ hàng
                    <span className="ml-2 inline-block rounded-full bg-black px-3 text-white">
                      {cart.totalItems}
                    </span>
                  </Link>
                  <ul className="absolute right-3 hidden max-h-[600px] w-[320px] overflow-y-auto rounded border border-gray-300 bg-white group-hover:block">
                    <div className="h-auto w-full bg-[#070707] text-white">
                      <span className="p-4 text-sm leading-[30px]">
                        Giỏ Hàng Của Tôi
                      </span>
                    </div>
                    {cart.items.length === 0 ? (
                      <li>
                        <a className="block px-[15px] py-[15px]" href="#">
                          Bạn chưa có sản phẩm nào trong giỏ hàng !
                        </a>
                      </li>
                    ) : (
                      // Hiển thị danh sách sản phẩm trong giỏ hàng
                      cart.items.map((item) => (
                        <li key={item._id} className="p-4">
                          <div className="grid grid-flow-col text-sm">
                            <div className="h-[100px] w-[67px]">
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
                              <p className="float-end cursor-default font-bold">
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
                      <li className="cursor-default p-4">
                        <p className="h-[20px] font-bold">
                          <span className="float-start">THÀNH TIỀN:</span>
                          <span className="float-end">
                            {formatCurrency(cart.totalCartPrice)}
                          </span>
                        </p>
                      </li>
                      <div className="p-2">
                        <button
                          className="mb-2 h-[36px] w-full rounded bg-[#070707] text-[#ffffff] duration-300 ease-in-out hover:opacity-85"
                          onClick={handleCheckout}
                        >
                          THANH TOÁN NGAY
                        </button>
                        <button className="mb-2 h-[36px] w-full rounded border border-[#070707] bg-[#ffffff] text-[#070707] duration-300 ease-in-out hover:bg-gray-200">
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
