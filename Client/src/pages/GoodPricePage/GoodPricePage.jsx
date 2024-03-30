import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  setSelectedProductId,
} from "../../features/product/productSlice";
import useCurrencyFormatter from "../../hooks/useCurrencyFormatter";
import Navbar from "../../components/Navbar";
import slugify from "slugify";

export default function GoodPricePage() {
  // Sử dụng useDispatch để gửi các action đến Redux store và useSelector để lấy state từ Redux store
  const dispatch = useDispatch();

  // Khai báo useNavigate
  const navigate = useNavigate();

  // Định dạng tiền tệ
  const { formatCurrency } = useCurrencyFormatter();

  // Lấy danh sách sản phẩm từ store
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);

  // Trang hiện tại
  const [currentPage, setCurrentPage] = useState(1);

  // Số sản phẩm trên mỗi trang
  const productsPerPage = 12;

  // Tính toán sản phẩm hiển thị trên trang hiện tại
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const displayedProducts = products
    .filter((product) =>
      product.categories.includes("65c600aafb866364b3105e3f")
    )
    .slice(startIndex, endIndex);

  // Tính toán số trang
  const totalPages = Math.ceil(displayedProducts.length / productsPerPage);

  // Hàm chuyển trang
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Trạng thái của menu con
  const [openMenu, setOpenMenu] = useState(null);

  // Function để mở và đóng các menu con
  const toggleMenu = (menuName) => {
    setOpenMenu((prevMenu) => (prevMenu === menuName ? null : menuName));
  };

  // Chuyển đổi chuỗi thành slug
  const convertToSlug = (text) =>
    slugify(text.replace(/Đ/g, "D"), { lower: true });

  // Xử lý khi click vào sản phẩm
  const handleClick = (productId) => {
    dispatch(setSelectedProductId(productId));
    // Thực hiện chuyển hướng đến trang chi tiết sản phẩm
    navigate(`/san-pham-chi-tiet/${convertToSlug(productId)}`);
  };

  // Sử dụng useEffect để gọi action fetchProducts
  useEffect(() => {
    dispatch(fetchProducts());
  }, [status, dispatch]);
  return (
    <>
      <section>
        <div className="w-full h-[49px] mx-auto mt-[92px] border-t border-[#EFEFF4]">
          <div className="text-[14px] leading-[49px] font-light px-[60px] ">
            <Link to="/" className="ml-[60px]">
              TRANG CHỦ
            </Link>
            <span> / SẢN PHẨM GIÁ TỐT</span>
          </div>
        </div>
        <div className="">
          <img
            src="https://file.hstatic.net/200000182297/file/sacc_3ac903271d5a4ea0b08e55159bbabfd0.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </section>
      <section>
        <div className="w-full h-[2700px] py-[50px]">
          <div className="w-[1360px] h-[2500px] mx-auto px-[30px]">
            <div className="w-[1330px] h-full grid grid-flow-col">
              <div className="w-[302px] h-[512px] pl-[30px] cursor-pointer">
                <Navbar />
              </div>
              <div className="w-[1028px] h-[2500px] pl-[30px] grid grid-flow-row">
                <div className="w-[967px] h-[56px] grid grid-flow-col auto-cols-max">
                  <h1 className="w-[302px] h-[27px] font-bold text-[18px]">
                    TẤT CẢ SẢN PHẨM
                  </h1>
                  <div className="w-[664px] h-[56px] pl-[30px] grid grid-flow-col text-[14px] place-items-end items-center">
                    {/* Menu Kích cỡ */}
                    <ul className="relative">
                      <li className="relative group">
                        <span
                          className="cursor-pointer"
                          onClick={() => toggleMenu("sizeMenuOpen")}
                        >
                          Kích cỡ
                          <FontAwesomeIcon
                            icon={faCaretDown}
                            className="ml-2 text-[#828282]"
                          />
                        </span>

                        {/* Menu con */}
                        <ul
                          className={`absolute left-1/2 transform -translate-x-1/2 top-full mt-1 p-2 bg-white border border-gray-300 opacity-0 pointer-events-none origin-bottom transition-transform duration-300 ${
                            openMenu === "sizeMenuOpen"
                              ? "opacity-100 pointer-events-auto z-10 w-[250px] h-[100px] grid grid-flow-row rounded-md translate-y-0"
                              : "translate-y-10"
                          }`}
                        >
                          <div className="grid grid-cols-4 gap-2 leading-[30px] text-[12px] place-items-center text-center cursor-pointer">
                            <li className="w-[50px] h-[30px] border hover:bg-black hover:text-white duration-300 ease-in-out rounded-md">
                              Size 2
                            </li>
                            <li className="w-[50px] h-[30px] border hover:bg-black hover:text-white duration-300 ease-in-out rounded-md">
                              Size 4
                            </li>
                            <li className="w-[50px] h-[30px] border hover:bg-black hover:text-white duration-300 ease-in-out rounded-md">
                              Size 6
                            </li>
                            <li className="w-[50px] h-[30px] border hover:bg-black hover:text-white duration-300 ease-in-out rounded-md">
                              Size 8
                            </li>
                            <li className="w-[50px] h-[30px] border hover:bg-black hover:text-white duration-300 ease-in-out rounded-md">
                              Size 10
                            </li>
                            <li className="w-[50px] h-[30px] border hover:bg-black hover:text-white duration-300 ease-in-out rounded-md">
                              Size 12
                            </li>
                          </div>
                          {/* Thêm các mục khác tùy ý */}
                        </ul>
                      </li>
                    </ul>

                    {/* Menu Màu sắc */}
                    <ul className="relative">
                      <li className="relative group">
                        <span
                          className="cursor-pointer"
                          onClick={() => toggleMenu("colorMenuOpen")}
                        >
                          Màu sắc
                          <FontAwesomeIcon
                            icon={faCaretDown}
                            className="ml-2 text-[#828282]"
                          />
                        </span>

                        {/* Menu con */}
                        <ul
                          className={`absolute left-1/2 transform -translate-x-1/2 mt-1 p-2 bg-white border border-gray-300 opacity-0 pointer-events-none origin-bottom transition-transform duration-300 ${
                            openMenu === "colorMenuOpen"
                              ? "opacity-100 pointer-events-auto z-10 w-[300px] h-[100px] rounded-md translate-y-0 grid grid-flow-row"
                              : "translate-y-10"
                          }`}
                        >
                          <div className="grid grid-cols-6 place-items-center cursor-pointer">
                            <li className="w-[28px] h-[28px] border rounded-full hover:border-black bg-[#a5cee9]"></li>
                            <li className="w-[28px] h-[28px] border rounded-full hover:border-black bg-[#ee3030]"></li>
                            <li className="w-[28px] h-[28px] border rounded-full hover:border-black bg-[#df86df]"></li>
                            <li className="w-[28px] h-[28px] border rounded-full hover:border-black bg-[#f5dc53]"></li>
                            <li className="w-[28px] h-[28px] border rounded-full hover:border-black bg-[#ffffff]"></li>
                            <li className="w-[28px] h-[28px] border rounded-full hover:border-black bg-[#000000]"></li>
                            <li className="w-[28px] h-[28px] border rounded-full hover:border-black bg-[#6f6431]"></li>
                            <li className="w-[28px] h-[28px] border rounded-full hover:border-black bg-[#ebd8d8]"></li>
                            <li className="w-[28px] h-[28px] border rounded-full hover:border-black bg-[#9b9b9b]"></li>
                            <li className="w-[28px] h-[28px] border rounded-full hover:border-black bg-[#3eb841]"></li>
                            <li className="w-[28px] h-[28px] border rounded-full hover:border-black bg-[#f2851b]"></li>
                            <li className="w-[28px] h-[28px] border rounded-full hover:border-black bg-[#f29eca]"></li>
                          </div>
                          {/* Thêm các mục khác tùy ý */}
                        </ul>
                      </li>
                    </ul>

                    {/* Menu Giá */}
                    <ul className="relative">
                      <li className="relative group">
                        <span
                          className="cursor-pointer"
                          onClick={() => toggleMenu("priceMenuOpen")}
                        >
                          Giá
                          <FontAwesomeIcon
                            icon={faCaretDown}
                            className="ml-2 text-[#828282]"
                          />
                        </span>

                        {/* Menu con */}
                        <ul
                          className={`absolute right-0 mt-1 p-2 bg-white border border-gray-300 opacity-0 pointer-events-none transform origin-bottom transition-transform duration-300 ${
                            openMenu === "priceMenuOpen"
                              ? "opacity-100 pointer-events-auto z-10 w-[130px] h-[100px] rounded-md translate-y-0"
                              : "translate-y-10"
                          }`}
                        >
                          <li className="h-[30px] leading-[30px] text-start">
                            <label className="flex items-center cursor-pointer">
                              <input
                                id="priceDefault"
                                type="radio"
                                name="priceOrder"
                                className="cursor-pointer"
                              />
                              <span className="ml-2">Mặc định</span>
                            </label>
                          </li>
                          <li className="h-[30px] leading-[30px] text-start">
                            <label className="flex items-center cursor-pointer">
                              <input
                                id="priceAscending"
                                type="radio"
                                name="priceOrder"
                                className="cursor-pointer"
                              />
                              <span className="ml-2">Giá tăng dần</span>
                            </label>
                          </li>
                          <li className="h-[30px] leading-[30px] text-start">
                            <label className="flex items-center cursor-pointer">
                              <input
                                id="priceDescending"
                                type="radio"
                                name="priceOrder"
                                className="cursor-pointer"
                              />
                              <span className="ml-2">Giá giảm dần</span>
                            </label>
                          </li>
                          {/* Thêm các mục khác tùy ý */}
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="w-[967px] h-[2350px] mt-[30px] grid grid-rows-4 cursor-pointer">
                  <div className="grid grid-cols-3">
                    {displayedProducts.map((product) => (
                      <div
                        key={product._id}
                        onClick={() => handleClick(product._id, product.name)}
                        className="w-[319px] h-[580px]"
                      >
                        <div className="hover:-translate-y-1 duration-500 ease-in-out">
                          <div className="w-[321px] h-[481px] relative group overflow-hidden">
                            <div className="">
                              <img
                                src={product.images[0]}
                                alt=""
                                className="hover:opacity-90 object-cover w-full h-full rounded-xl "
                              />
                            </div>
                            <div className="absolute inset-0 bg-[#212529] opacity-0 hover:opacity-10 transition-opacity flex items-center justify-center rounded-xl "></div>
                          </div>
                          <div className="text-center mt-5">
                            <p className="transition-colors text-[#07070780] font-bold hover:text-black ease-in-out duration-300">
                              {product.name}
                            </p>
                            <p className="text-[#070707] font-bold mt-5">
                              {formatCurrency(product.price)}
                              <span className="text-[#FF3B30] line-through font-bold ml-[10px]">
                                {formatCurrency(product.discount)}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-[967px] h-[52px] group">
                  <div className="w-[270px] h-[52px] mx-auto grid grid-cols-5 place-items-center font-bold">
                    {/* Tạo các nút chuyển trang */}
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <div
                        key={index}
                        className={`w-[40px] h-[40px] cursor-pointer text-center leading-[40px] border border-[#f8f8f9] rounded 
                        ${
                          currentPage === index + 1
                            ? "hover:text-white hover:bg-[#070707] bg-[#070707] text-white"
                            : "hover:text-white hover:bg-[#070707] bg-[#f8f8f9] text-black"
                        } `}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {/* Hiển thị số trang*/}
                        <span>{index + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
