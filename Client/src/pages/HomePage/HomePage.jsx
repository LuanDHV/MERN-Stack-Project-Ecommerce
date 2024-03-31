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
    (state) => state.slideshow.currentIndexForNewProducts
  );
  const visibleNewProducts = products
    .filter((product) =>
      product.categories.includes("65de35c832056bb1c72e0d2b")
    )
    .slice(currentIndexForNewProducts, currentIndexForNewProducts + 4);

  // Lấy ra 4 sản phẩm hiển thị trên trang (dựa trên currentIndexForPremiumDresses)
  // Lọc sản phẩm theo danh mục "65c6000ffb866364b3105e24"
  const currentIndexForPremiumDresses = useSelector(
    (state) => state.slideshow.currentIndexForPremiumDresses
  );
  const visiblePremiumDresses = products
    .filter((product) =>
      product.categories.includes("65c6000ffb866364b3105e24")
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
        <div className="mt-[92px]">
          <img
            src="https://theme.hstatic.net/200000182297/1000887316/14/ms_banner_img2.jpg?v=1068"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* SẢN PHẨM BÁN CHẠY */}
      <section>
        <div className="w-[1300px] h-[54px] mx-auto my-8 px-[30px]">
          <h2 className="text-center">
            <Link to="/" className="ml-[60px] font-bold text-[32px]">
              SẢN PHẨM BÁN CHẠY
            </Link>
          </h2>
        </div>
        <div className="w-[1350px] mx-auto grid grid-flow-col gap-5 cursor-pointer relative">
          {/* Nút chuyển đến slide trước */}
          <button
            onClick={() => handlePrevSlide("NewProducts")}
            className="w-[40px] h-[40px] absolute top-52 left-0 z-10 bg-[#070707B3] rounded-sm"
          >
            <FontAwesomeIcon icon={faCaretLeft} className="text-white " />
          </button>

          {/* Danh sách sản phẩm */}
          {visibleNewProducts.map((product) => (
            <div
              key={product._id}
              onClick={() => handleClick(product._id, product.name)}
              className={`transition-transform transform hover:-translate-y-1 duration-300`}
            >
              <div className="w-[300px] h-[450px] relative group overflow-hidden">
                <div className="">
                  <img
                    src={product.images[0]}
                    alt=""
                    className="hover:opacity-90 object-cover w-full h-full rounded-xl"
                  />
                </div>
                <div className="absolute inset-0 bg-[#212529] opacity-0 hover:opacity-10 transition-opacity flex items-center justify-center rounded-xl"></div>
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
          ))}

          {/* Nút chuyển đến slide tiếp theo */}
          <button
            onClick={() => handleNextSlide("NewProducts")}
            className="w-[40px] h-[40px] absolute top-52 right-0 z-10 bg-[#070707B3] rounded-sm"
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
            className="w-full h-full object-cover"
          />
        </div>
      </section>
      {/* ÁO DÀI CAO CẤP */}
      <section>
        <div className="w-[1300px] h-[54px] mx-auto mt-28 mb-8 px-[30px]">
          <h2 className="text-center">
            <Link to="/" className="ml-[60px] font-bold text-[32px]">
              ÁO DÀI CAO CẤP
            </Link>
          </h2>
        </div>
        <div className="w-[1350px] mx-auto grid grid-flow-col gap-5 cursor-pointer relative">
          {/* Nút chuyển đến slide trước */}
          <button
            onClick={() => handlePrevSlide("PremiumDresses")}
            className="w-[40px] h-[40px] absolute top-52 left-0 z-10 bg-[#070707B3] rounded-sm"
          >
            <FontAwesomeIcon icon={faCaretLeft} className="text-white " />
          </button>

          {/* Danh sách sản phẩm */}
          {visiblePremiumDresses.map((product) => (
            <div
              key={product._id}
              onClick={() => handleClick(product._id, product.name)}
              className={`transition-transform transform hover:-translate-y-1 duration-300`}
            >
              <div className="w-[300px] h-[450px] relative group overflow-hidden">
                <div className="">
                  <img
                    src={product.images[0]}
                    alt=""
                    className="hover:opacity-90 object-cover w-full h-full rounded-xl"
                  />
                </div>
                <div className="absolute inset-0 bg-[#212529] opacity-0 hover:opacity-10 transition-opacity flex items-center justify-center rounded-xl"></div>
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
          ))}

          {/* Nút chuyển đến slide tiếp theo */}
          <button
            onClick={() => handleNextSlide("PremiumDresses")}
            className="w-[40px] h-[40px] absolute top-52 right-0 z-10 bg-[#070707B3] rounded-sm"
          >
            <FontAwesomeIcon icon={faCaretRight} className="text-white" />
          </button>
        </div>
      </section>
    </>
  );
}
