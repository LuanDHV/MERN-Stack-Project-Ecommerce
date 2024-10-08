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

export default function DamPage() {
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
      product.categories.includes("65de35c832056bb1c72e0d2b"),
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
        product.colors.some((color) => selectedColors.includes(color)),
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
        <div className="mx-auto mt-20 h-12 w-full border-t border-[#EFEFF4]">
          <div className="mx-auto w-5/6 text-sm font-light">
            <Link to="/" className="">
              TRANG CHỦ
            </Link>
            <span> / ĐẦM</span>
          </div>
        </div>
        <div className="">
          <img
            src="https://file.hstatic.net/200000182297/file/banner_web_15_02_23_bc417e51b3bb4665845c5e80fa268e1c.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      </section>
      <section>
        <div className="h-auto w-full py-10">
          <div className="mx-auto h-auto w-5/6">
            <div className="grid h-full w-full grid-flow-col">
              <div className="hidden h-auto w-60 cursor-pointer xl:block">
                <Navbar />
              </div>
              <div className="grid h-auto w-full grid-flow-row">
                <div className="flex h-14 w-full items-center justify-between">
                  <h1 className="text-lg font-bold">TẤT CẢ SẢN PHẨM</h1>
                  <div className="flex h-14 items-center justify-end gap-5 text-sm">
                    {/* Menu Màu sắc */}
                    <ul className="relative">
                      <li className="group relative">
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
                          className={`pointer-events-none absolute left-1/2 mt-1 origin-bottom -translate-x-1/2 transform border border-gray-300 bg-white p-2 opacity-0 transition-transform duration-300 ${
                            openMenu === "colorMenuOpen"
                              ? "pointer-events-auto z-10 grid h-[100px] w-[190px] translate-y-0 grid-flow-row rounded-md opacity-100"
                              : "translate-y-10"
                          }`}
                        >
                          <div className="grid cursor-pointer grid-cols-5 place-items-center">
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
                                className={`flex h-[28px] w-[28px] cursor-pointer items-center justify-center rounded-full border duration-300 ease-in-out hover:border-black`}
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
                      <li className="group relative">
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
                          className={`pointer-events-none absolute right-0 mt-1 origin-bottom transform border border-gray-300 bg-white p-2 opacity-0 transition-transform duration-300 ${
                            openMenu === "priceMenuOpen"
                              ? "pointer-events-auto z-10 h-[100px] w-[130px] translate-y-0 rounded-md opacity-100"
                              : "translate-y-10"
                          }`}
                        >
                          <li className="h-auto text-start leading-[30px]">
                            <label className="flex cursor-pointer items-center">
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
                          <li className="h-auto text-start leading-[30px]">
                            <label className="flex cursor-pointer items-center">
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
                          <li className="h-auto text-start leading-[30px]">
                            <label className="flex cursor-pointer items-center">
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
                <div className="grid h-auto w-full cursor-pointer">
                  <div className="grid grid-cols-2 gap-5 xl:grid-cols-4">
                    {filteredProducts
                      .filter((product) =>
                        product.categories.includes("65de35c832056bb1c72e0d2b"),
                      )
                      .slice(startIndex, endIndex)
                      .map((product) => (
                        <div
                          key={product._id}
                          onClick={() => handleClick(product._id, product.name)}
                          className="w-full"
                        >
                          <div className="duration-500 ease-in-out hover:-translate-y-1">
                            <div className="group relative w-full">
                              <div className="">
                                <img
                                  src={product.images[0]}
                                  alt=""
                                  className="h-full w-full rounded-xl object-cover hover:opacity-90"
                                />
                              </div>
                              <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-[#212529] opacity-0 transition-opacity hover:opacity-10"></div>
                            </div>
                            <div className="mt-5 text-center">
                              <p className="font-bold text-[#07070780] transition-colors duration-300 ease-in-out hover:text-black">
                                {product.name}
                              </p>
                              <p className="grid font-bold text-[#070707]">
                                <span className="font-bold text-[#FF3B30] line-through">
                                  {formatCurrency(product.discount)}
                                </span>
                                {formatCurrency(product.price)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="group h-14 w-full">
                  {/* Tạo các nút chuyển trang */}
                  <div className="mx-auto mt-5 flex h-auto justify-center font-bold">
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <div
                        key={index}
                        className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded border border-[#f8f8f9] ${
                          currentPage === index + 1
                            ? "bg-[#070707] text-white hover:bg-[#070707] hover:text-white"
                            : "bg-[#f8f8f9] text-black hover:bg-[#070707] hover:text-white"
                        } `}
                        onClick={() => handlePageChange(index + 1)}
                      >
                        <span className="">{index + 1}</span>
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
