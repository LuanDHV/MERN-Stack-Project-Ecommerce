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
  // const user = useSelector((state) => state.user.user);

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
      // if (!user) {
      //   toast.warning("Vui lòng đăng nhập");
      //   return;
      // }

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
      // if (!user) {
      //   toast.warning("Vui lòng đăng nhập");
      //   return;
      // }

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
        <div className="mx-auto mt-20 h-12 w-full border-t border-[#EFEFF4]">
          <div className="mx-auto w-5/6 text-sm font-light">
            <Link to="/" className="">
              TRANG CHỦ
            </Link>
            <span> / SẢN PHẨM CHI TIẾT</span>
            <span> / {product.name}</span>
          </div>
        </div>

        {/* Nội dung chi tiết sản phẩm */}
        <div className="mx-auto h-auto w-full">
          <div className="mx-auto flex h-auto w-full gap-5 px-5 xl:w-5/6 xl:px-0">
            {/* Danh sách ảnh sản phẩm */}
            <div className="hidden h-auto w-1/6 cursor-pointer flex-col items-center xl:flex">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt=""
                  className={`cursor-pointer border ${
                    selectedImage === index ? "border-black" : ""
                  }`}
                  onClick={() => handleImageClick(index)}
                />
              ))}
            </div>

            {/* Ảnh sản phẩm chính */}
            <div className="w-3/6">
              <img
                src={product.images[selectedImageIndex]}
                alt=""
                className="object-cover"
              />
            </div>
            {/* Thông tin sản phẩm và nút mua hàng */}
            <div className="w-3/6 xl:w-2/6">
              {/* Tên sản phẩm */}
              <h1 className="text-lg font-bold">{product.name}</h1>

              {/* Thông tin sản phẩm */}
              <div className="my-5 text-sm font-light">
                <span className="block">Thuơng hiệu: NEM</span>
                <span className="hidden uppercase xl:block">
                  Mã SP: {product._id}
                </span>
              </div>

              {/* Giá sản phẩm */}
              <span className="block text-lg font-bold">
                {formatCurrency(product.price)}
              </span>

              {/* Kích thước sản phẩm */}
              <div className="my-5">
                <div className="mb-2 h-5 text-sm font-bold">Kích thước</div>
                {product.sizes && product.sizes.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        className={`h-10 w-14 cursor-pointer rounded border text-center text-sm focus:border-black ${
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
                <span className="text-sm font-bold">Màu sắc:</span>
                <div
                  className="my-2 h-10 w-10 rounded-full border border-black"
                  style={colorStyle}
                ></div>
              </div>

              {/* Nút hiển thị modal hướng dẫn chọn size */}
              <span
                className="cursor-pointer text-sm font-normal text-[#070707] underline"
                onClick={openSizeGuideModal}
              >
                Hướng dẫn chọn size
              </span>

              {/* Modal hướng dẫn chọn size */}
              {isSizeGuideModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center">
                  {/* Màn bao quanh */}
                  <div className="fixed inset-0 bg-black bg-opacity-80"></div>
                  {/* Nội dung modal */}
                  <div className="z-50 h-[500px] w-full rounded-md bg-white">
                    {/* Nút đóng modal */}
                    <button onClick={closeSizeGuideModal} className="float-end">
                      <FontAwesomeIcon
                        icon={faCircleXmark}
                        className="h-6 w-6"
                      />
                    </button>
                    {/* Nội dung hướng dẫn chọn size */}
                    <img
                      src={Sizes}
                      alt="Hướng dẫn chọn size"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Nút thêm vào giỏ hàng và mua ngay */}
              <div className="mt-10 grid grid-rows-2">
                <button
                  className="mb-2 h-10 rounded border border-black text-sm font-bold duration-300 ease-in-out hover:bg-gray-200"
                  onClick={handleAddToCart}
                >
                  THÊM VÀO GIỎ
                </button>
                <button
                  className="h-10 rounded border border-black bg-black text-sm font-bold text-white duration-300 ease-in-out hover:opacity-85"
                  onClick={handleBuyNow}
                >
                  MUA NGAY
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
