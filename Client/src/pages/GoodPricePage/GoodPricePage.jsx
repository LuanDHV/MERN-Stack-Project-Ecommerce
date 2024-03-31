import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useCurrencyFormatter from "../../hooks/useCurrencyFormatter";
import Navbar from "../../components/Navbar";
import slugify from "slugify";
import {
  fetchProducts,
  setSelectedProductId,
} from "../../features/product/productSlice";
import {
  setFilterPrice,
  selectFilterProducts,
} from "../../features/product/filterProductSlice";

export default function GoodPricePage() {
  const dispatch = useDispatch(); // Sử dụng useDispatch để gửi các action đến Redux store
  const navigate = useNavigate(); // Khai báo useNavigate
  const { formatCurrency } = useCurrencyFormatter(); // Định dạng tiền tệ
  const products = useSelector((state) => state.products.items); // Lấy danh sách sản phẩm từ store
  const status = useSelector((state) => state.products.status); // Lấy trạng thái của fetch sản phẩm
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const filterState = useSelector(selectFilterProducts); // Lấy trạng thái filter từ store
  const [filteredProducts, setFilteredProducts] = useState([]); // Danh sách sản phẩm đã được lọc và sắp xếp
  const [selectedColors, setSelectedColors] = useState([]); // Mảng các màu được chọn để lọc sản phẩm
  const productsPerPage = 12; // Số sản phẩm trên mỗi trang
  const startIndex = (currentPage - 1) * productsPerPage; // Tính toán sản phẩm hiển thị trên trang hiện tại
  const endIndex = startIndex + productsPerPage;
  const displayedProducts = products
    .filter((product) =>
      product.categories.includes("65c600aafb866364b3105e3f")
    )
    .slice(startIndex, endIndex);

  const totalPages = Math.ceil(displayedProducts.length / productsPerPage); // Tính toán số trang

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

  // Xử lý bộ lọc màu sắc
  const handleColorFilter = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  // Xử lý bộ lọc giá
  const handlePriceFilter = (priceOption) => {
    if (priceOption === "ascending") {
      dispatch(setFilterPrice("ASC"));
    } else if (priceOption === "descending") {
      dispatch(setFilterPrice("DESC"));
    } else {
      dispatch(setFilterPrice(null));
    }
  };

  // Sử dụng useEffect để lọc và sắp xếp danh sách sản phẩm khi có thay đổi trong bộ lọc hoặc danh sách sản phẩm gốc
  useEffect(() => {
    let filteredProducts = [...products];

    // Lọc sản phẩm theo màu sắc đã chọn
    if (selectedColors.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        product.colors.some((color) => selectedColors.includes(color))
      );
    }

    // Sắp xếp sản phẩm theo giá
    if (filterState.filterPrice !== null) {
      if (filterState.filterPrice === "ASC") {
        filteredProducts.sort((a, b) => a.price - b.price);
      } else {
        filteredProducts.sort((a, b) => b.price - a.price);
      }
    }

    // Cập nhật danh sách sản phẩm đã lọc và sắp xếp
    setFilteredProducts(filteredProducts);
  }, [filterState, products, selectedColors]);

  // Sử dụng useEffect để gọi action fetchProducts khi status là "idle"
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
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
        <div className="w-full h-auto py-[50px]">
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
                  <div className="w-[664px] h-[56px] pl-[30px] grid grid-cols-4 text-[14px] place-items-end items-center">
                    <div className=""></div>
                    <div className=""></div>
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
                          <div className="grid grid-cols-5 place-items-center cursor-pointer">
                            {[
                              "Blue",
                              "Red",
                              "Purple",
                              "Yellow",
                              "White",
                              "Black",
                              "Brown",
                              "Green",
                              "Orange",
                              "Pink",
                            ].map((color) => (
                              <li
                                key={color}
                                className={`w-[28px] h-[28px] border rounded-full hover:border-black duration-300 ease-in-out flex items-center justify-center cursor-pointer `}
                                style={{ backgroundColor: color }}
                                onClick={() => handleColorFilter(color)}
                              >
                                {selectedColors.includes(color) && (
                                  <FontAwesomeIcon
                                    icon={faCheck}
                                    className="text-black"
                                  />
                                )}
                              </li>
                            ))}
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
                                onClick={() => handlePriceFilter("default")}
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
                                onClick={() => handlePriceFilter("ascending")}
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
                                onClick={() => handlePriceFilter("descending")}
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
                    {filteredProducts
                      .filter((product) =>
                        product.categories.includes("65c600aafb866364b3105e3f")
                      )
                      .slice(startIndex, endIndex)
                      .map((product) => (
                        <div
                          key={product._id}
                          onClick={() => handleClick(product._id, product.name)}
                          className="w-[300px] h-[580px]"
                        >
                          <div className="hover:-translate-y-1 duration-500 ease-in-out">
                            <div className="w-[300px] h-[450px] relative group overflow-hidden">
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
