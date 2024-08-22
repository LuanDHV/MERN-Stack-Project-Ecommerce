import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  setSelectedProductId,
} from "../../features/product/productSlice";
import { nextSlide, prevSlide } from "../../features/product/slideShowSlice";
import useCurrencyFormatter from "../../hooks/useCurrencyFormatter";
import slugify from "slugify";

export default function HomePage() {
  // Sử dụng hook useDispatch để lấy hàm dispatch từ Redux
  const dispatch = useDispatch();

  // Khai báo useNavigate
  const navigate = useNavigate();

  // Định dạng tiền tệ
  const { formatCurrency } = useCurrencyFormatter();

  // Chuyển đổi chuỗi thành slug
  const convertToSlug = (text) =>
    slugify(text.replace(/Đ/g, "D"), { lower: true });

  // Lấy danh sách sản phẩm từ store
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);

  // Lấy ra 4 sản phẩm hiển thị trên trang (dựa trên currentIndexForNewProducts)
  // Lọc sản phẩm theo danh mục "65de35c832056bb1c72e0d2b"
  const currentIndexForNewProducts = useSelector(
    (state) => state.slideshow.currentIndexForNewProducts,
  );
  const visibleNewProducts = products
    .filter((product) =>
      product.categories.includes("65de35c832056bb1c72e0d2b"),
    )
    .slice(currentIndexForNewProducts, currentIndexForNewProducts + 4);

  // Lấy ra 4 sản phẩm hiển thị trên trang (dựa trên currentIndexForPremiumDresses)
  // Lọc sản phẩm theo danh mục "65c6000ffb866364b3105e24"
  const currentIndexForPremiumDresses = useSelector(
    (state) => state.slideshow.currentIndexForPremiumDresses,
  );
  const visiblePremiumDresses = products
    .filter((product) =>
      product.categories.includes("65c6000ffb866364b3105e24"),
    )
    .slice(currentIndexForPremiumDresses, currentIndexForPremiumDresses + 4);

  // Handler khi muốn chuyển đến slide trước đó
  const handlePrevSlide = (productType) => {
    dispatch(prevSlide(productType));
  };

  // Handler khi muốn chuyển đến slide tiếp theo
  const handleNextSlide = (productType) => {
    dispatch(nextSlide(productType));
  };

  // Effect để tự động chuyển slide sau mỗi khoảng thời gian
  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide("NewProducts");
      handleNextSlide("PremiumDresses");
    }, 3000);

    // Đảm bảo xóa interval khi component unmount hoặc khi useEffect chạy lại.
    return () => clearInterval(interval);
  }, []);

  // Xử lý khi click vào sản phẩm
  const handleClick = (productId) => {
    dispatch(setSelectedProductId(productId));
    // Thực hiện chuyển hướng đến trang chi tiết sản phẩm
    navigate(`/san-pham-chi-tiet/${convertToSlug(productId)}`);
  };

  // Khi component được render lần đầu tiên hoặc có sự thay đổi trong status,
  // gọi action fetchProducts để lấy danh sách sản phẩm nếu status là "idle"
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  return (
    <>
      {/* Banner */}
      <section>
        <div className="mt-24">
          <img
            src="https://theme.hstatic.net/200000182297/1000887316/14/ms_banner_img2.jpg?v=1068"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      {/* SẢN PHẨM BÁN CHẠY */}
      <section>
        <div className="mx-auto my-8 h-14 w-full">
          <h2 className="text-center">
            <Link to="/" className="text-3xl font-bold">
              SẢN PHẨM BÁN CHẠY
            </Link>
          </h2>
        </div>
        <div className="relative mx-auto grid w-5/6 cursor-pointer grid-cols-2 gap-5 md:grid-cols-4">
          {/* Nút chuyển đến slide trước */}
          <button
            onClick={() => handlePrevSlide("NewProducts")}
            className="absolute left-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 transform rounded-sm bg-[#070707B3] opacity-50 duration-300 ease-in-out hover:opacity-100 md:block"
          >
            <FontAwesomeIcon icon={faCaretLeft} className="text-white" />
          </button>

          {/* Danh sách sản phẩm */}
          {visibleNewProducts.map((product) => (
            <div
              key={product._id}
              onClick={() => handleClick(product._id, product.name)}
              className={`transform transition-transform duration-300 hover:-translate-y-1`}
            >
              <div className="group relative">
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
                <p className="flex flex-col font-bold text-[#070707]">
                  {formatCurrency(product.price)}
                  <span className="font-bold text-[#FF3B30] line-through">
                    {formatCurrency(product.discount)}
                  </span>
                </p>
              </div>
            </div>
          ))}

          {/* Nút chuyển đến slide tiếp theo */}
          <button
            onClick={() => handleNextSlide("NewProducts")}
            className="absolute right-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 transform rounded-sm bg-[#070707B3] opacity-50 duration-300 ease-in-out hover:opacity-100 md:block"
          >
            <FontAwesomeIcon icon={faCaretRight} className="text-white" />
          </button>
        </div>
      </section>

      {/* Banner2 */}
      <section>
        <div className="mt-16">
          <img
            src="https://theme.hstatic.net/200000182297/1000887316/14/ms_banner_img3.jpg?v=1068"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      </section>
      {/* ÁO DÀI CAO CẤP */}
      <section>
        <div className="mx-auto my-8 h-14 w-full">
          <h2 className="text-center">
            <Link to="/" className="text-3xl font-bold">
              ÁO DÀI CAO CẤP
            </Link>
          </h2>
        </div>
        <div className="relative mx-auto grid w-5/6 cursor-pointer grid-cols-2 gap-5 md:grid-cols-4">
          {/* Nút chuyển đến slide trước */}
          <button
            onClick={() => handlePrevSlide("PremiumDresses")}
            className="absolute left-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 transform rounded-sm bg-[#070707B3] opacity-50 duration-300 ease-in-out hover:opacity-100 md:block"
          >
            <FontAwesomeIcon icon={faCaretLeft} className="text-white" />
          </button>

          {/* Danh sách sản phẩm */}
          {visiblePremiumDresses.map((product) => (
            <div
              key={product._id}
              onClick={() => handleClick(product._id, product.name)}
              className={`transform transition-transform duration-300 hover:-translate-y-1`}
            >
              <div className="group relative">
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
                <p className="flex flex-col font-bold text-[#070707]">
                  {formatCurrency(product.price)}
                  <span className="font-bold text-[#FF3B30] line-through">
                    {formatCurrency(product.discount)}
                  </span>
                </p>
              </div>
            </div>
          ))}

          {/* Nút chuyển đến slide tiếp theo */}
          <button
            onClick={() => handleNextSlide("PremiumDresses")}
            className="absolute right-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 transform rounded-sm bg-[#070707B3] opacity-50 duration-300 ease-in-out hover:opacity-100 md:block"
          >
            <FontAwesomeIcon icon={faCaretRight} className="text-white" />
          </button>
        </div>
      </section>
    </>
  );
}
