import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  selectSelectedProduct,
  clearSelectedProduct,
} from "../../features/product/detailProductSlice";
import Sizes from "../../assets/IMG/Sizes.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { addToCart, setSize } from "../../features/cart/cartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DetailProductPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();

  const product = useSelector(selectSelectedProduct);
  const status = useSelector((state) => state.productDetails.status);
  const user = useSelector((state) => state.user.user);

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isSizeGuideModalOpen, setSizeGuideModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);

  // Mở modal hướng dẫn chọn size
  const openSizeGuideModal = () => {
    setSizeGuideModalOpen(true);
  };

  // Đóng modal hướng dẫn chọn size
  const closeSizeGuideModal = () => {
    setSizeGuideModalOpen(false);
  };

  const handleAddToCart = async () => {
    try {
      if (!user) {
        toast.warning("Vui lòng đăng nhập");
        return;
      }

      // Kiểm tra xem đã chọn size chưa
      if (!selectedSize) {
        toast.warning("Vui lòng chọn size");
        return;
      }

      // Cập nhật thông tin size cho sản phẩm
      const productWithSize = { ...product, selectedSize };

      dispatch(addToCart(productWithSize));
      toast.success("Thêm vào giỏ hàng thành công");
      // Thêm các xử lý khác nếu cần
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error.message);
      // Xử lý lỗi nếu cần
    }
  };

  const handleBuyNow = async () => {
    try {
      if (!user) {
        toast.warning("Vui lòng đăng nhập");
        return;
      }

      // Kiểm tra xem đã chọn size chưa
      if (!selectedSize) {
        toast.warning("Vui lòng chọn size");
        return;
      }

      // Cập nhật thông tin size cho sản phẩm
      const productWithSize = { ...product, selectedSize };

      dispatch(addToCart(productWithSize));
      toast.success("Thêm vào giỏ hàng thành công");
      navigate("/checkout");
      // Thêm các xử lý khác nếu cần
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error.message);
      // Xử lý lỗi nếu cần
    }
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
    dispatch(setSize({ itemId: product._id, size }));
  };

  useEffect(() => {
    // Fetch chi tiết sản phẩm khi component được mount
    if (productId) {
      dispatch(fetchProductDetails(productId));
    }

    // Clean up khi component unmount
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, productId]);

  // Kiểm tra nếu không có thông tin sản phẩm
  if (!product) {
    return <div>No product details available</div>;
  }

  // Kiểm tra trạng thái loading
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // Kiểm tra nếu có lỗi khi tải thông tin sản phẩm
  if (status === "failed") {
    return <div>Error loading product details</div>;
  }

  // Hàm định dạng tiền tệ
  function formatCurrency(amount) {
    return amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
      currencyDisplay: "symbol",
    });
  }

  // Stylizing màu sắc
  const colorStyle = { backgroundColor: product.colors };

  // Xử lý khi click vào ảnh sản phẩm
  const handleImageClick = (index) => {
    setSelectedImage(index);
    setSelectedImageIndex(index);
  };

  return (
    <>
      {/* Hiển thị thông báo */}
      <section>
        {/* Breadcrumbs */}
        <div className="w-full h-[49px] mx-auto mt-[92px] border-t border-[#EFEFF4]">
          <div className="text-[14px] leading-[49px] font-light px-[60px] ">
            <Link to="/" className="ml-[60px]">
              TRANG CHỦ
            </Link>
            <span> / SẢN PHẨM CHI TIẾT</span>
            <span> / {product.name}</span>
          </div>
        </div>

        {/* Nội dung chi tiết sản phẩm */}
        <div className="w-full h-[1000px] mx-auto ">
          <div className="w-[1300px] h-[1060px] mx-auto grid grid-flow-col">
            {/* Danh sách ảnh sản phẩm */}
            <div className="w-[200px] h-[930px] grid grid-rows-3 gap-y-3 cursor-pointer">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt=""
                  className={`border cursor-pointer ${
                    selectedImage === index ? "border-black" : ""
                  }`}
                  onClick={() => handleImageClick(index)}
                />
              ))}
            </div>

            {/* Ảnh sản phẩm chính */}
            <div className="w-[620px] h-[930px] mx-3">
              <img
                src={product.images[selectedImageIndex]}
                alt=""
                className="object-cover"
              />
            </div>

            {/* Thông tin sản phẩm và nút mua hàng */}
            <div className="w-[470px] h-[630px]">
              <div className="w-[360px] h-[630px] float-end">
                {/* Tên sản phẩm */}
                <h1 className="h-[27px] font-bold text-[18px]">
                  {product.name}
                </h1>

                {/* Thông tin sản phẩm */}
                <div className="text-[14px] font-light my-5">
                  <span className="block">Thuơng hiệu: NEM</span>
                  <span className="uppercase"> Mã SP: {product._id}</span>
                </div>

                {/* Giá sản phẩm */}
                <span className="h-[64px] font-bold text-[18px] block">
                  {formatCurrency(product.price)}
                </span>

                {/* Kích thước sản phẩm */}
                <div className="h-[64px] mb-5">
                  <div className="h-[20px] font-bold text-[14px] mb-2">
                    Kích thước
                  </div>
                  {product.sizes && product.sizes.length > 0 ? (
                    <div className="grid grid-flow-col gap-1">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          className={`w-[52px] h-[35px] text-center leading-[35px] border text-[12px] cursor-pointer focus:border-black rounded ${
                            selectedSize === size ? "border-black" : ""
                          }`}
                          onClick={() => handleSizeClick(size)}
                        >
                          Size {size}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>

                {/* Màu sắc sản phẩm */}
                <div className="">
                  <span className="font-bold text-[14px]">Màu sắc:</span>
                  <div
                    className="w-[35px] h-[35px] rounded-full border my-2 border-black "
                    style={colorStyle}
                  ></div>
                </div>

                {/* Nút hiển thị modal hướng dẫn chọn size */}
                <span
                  className="underline text-[15px] font-normal text-[#070707] cursor-pointer"
                  onClick={openSizeGuideModal}
                >
                  HƯỚNG DẪN CHỌN SIZE
                </span>

                {/* Modal hướng dẫn chọn size */}
                {isSizeGuideModalOpen && (
                  <div className="fixed inset-0 flex items-center justify-center">
                    {/* Màn bao quanh */}
                    <div className="fixed inset-0 bg-black bg-opacity-80"></div>
                    {/* Nội dung modal */}
                    <div className=" z-50 bg-white p-8 w-[1250px] h-[500px] rounded-md">
                      {/* Nút đóng modal */}
                      <button
                        onClick={closeSizeGuideModal}
                        className="float-end"
                      >
                        <FontAwesomeIcon
                          icon={faCircleXmark}
                          className="w-[24px] h-[24px] "
                        />
                      </button>
                      {/* Nội dung hướng dẫn chọn size */}
                      <img
                        src={Sizes}
                        alt="Hướng dẫn chọn size"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* Nút thêm vào giỏ hàng và mua ngay */}
                <div className="grid grid-rows-2 mt-10">
                  <button
                    className="h-[40px] border border-black font-bold text-[14px] mb-2 
                  hover:bg-gray-200 duration-300 ease-in-out rounded"
                    onClick={handleAddToCart}
                  >
                    THÊM VÀO GIỎ
                  </button>
                  <button
                    className="h-[40px] border border-black bg-black font-bold text-[14px] text-white 
                  hover:opacity-85 duration-300 ease-in-out rounded"
                    onClick={handleBuyNow}
                  >
                    MUA NGAY
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
