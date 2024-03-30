import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useCurrencyFormatter from "../../hooks/useCurrencyFormatter";
import HeaderAdmin from "../components/HeaderAdmin";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../features/product/productSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

export default function ProductsAdminPage() {
  // Sử dụng useDispatch để gửi các action đến Redux store và useSelector để lấy state từ Redux store
  const dispatch = useDispatch();
  // Định dạng tiền tệ
  const { formatCurrency } = useCurrencyFormatter();

  const [isNavbarVisible, setNavbarVisible] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Lấy danh sách sản phẩm từ store
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);

  // Trang hiện tại
  const [currentPage, setCurrentPage] = useState(1);

  // Số sản phẩm trên mỗi trang
  const productsPerPage = 10;

  // Tính toán số trang
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Tính toán sản phẩm hiển thị trên trang hiện tại
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const displayedProducts = products.slice(startIndex, endIndex);

  // Hàm chuyển trang
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Hàm rút ngắn độ dài ID
  const shortenId = (id) => id.slice(0, 8);

  // State cho dữ liệu sản phẩm
  const [productData, setProductData] = useState({
    name: "",
    images: [],
    discount: 0,
    price: 0,
    sizes: "",
    colors: "",
    countInStock: 0,
  });

  // Xử lý sự kiện thay đổi giá trị của input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("image")) {
      // Lấy chỉ số của input từ tên thuộc tính
      const index = parseInt(name.replace("image", ""));
      // Tạo một bản sao của mảng images
      const updatedImages = [...productData.images];
      // Cập nhật đường dẫn ảnh tại chỉ số tương ứng
      updatedImages[index] = value;
      // Cập nhật state productData
      setProductData((prevProductData) => ({
        ...prevProductData,
        images: updatedImages,
      }));
    } else {
      // Nếu không phải là input hình ảnh hoặc , cập nhật thông tin sản phẩm như bình thường
      setProductData((prevProductData) => ({
        ...prevProductData,
        [name]: value,
      }));
    }
  };

  // Hàm validate để kiểm tra thông tin sản phẩm
  const validate = () => {
    if (
      !productData.name ||
      !productData.images[0] ||
      productData.discount < 0 ||
      productData.price <= 0 ||
      productData.countInStock < 0
    ) {
      // Kiểm tra xem các trường thông tin cần thiết có được nhập hay không
      toast.warning("Vui lòng nhập đầy đủ thông tin và tối thiểu 1 hình ảnh");
      return false;
    }
    return true;
  };

  // Add
  const handleAddButtonClick = (product) => {
    setSelectedProduct(product);
    setShowAddModal(true); // Mở modal thêm sản phẩm
  };

  const handleConfirmAdd = async () => {
    try {
      if (validate()) {
        // Chuyển đổi chuỗi kích thước thành mảng
        const sizesArray = productData.sizes
          .split(",")
          .map((size) => size.trim());

        // Gọi action addProduct và truyền dữ liệu sản phẩm vào
        dispatch(addProduct({ ...productData, sizes: sizesArray }));

        // Reset dữ liệu sản phẩm sau khi thêm thành công
        setProductData({
          name: "",
          images: [],
          discount: 0,
          price: 0,
          sizes: "", // Đặt lại kích thước thành chuỗi rỗng
          colors: "",
          countInStock: 0,
        });

        setShowAddModal(false); // Đóng modal thêm sản phẩm

        // Hiển thị thông báo thành công
        toast.success("Thêm sản phẩm thành công!");
      }
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
      // Xử lý lỗi khi thêm sản phẩm
      alert("Đã có lỗi xảy ra khi thêm sản phẩm!");
    }
  };

  const handleCancelAdd = () => {
    setShowAddModal(false); // Đóng modal thêm sản phẩm
  };

  // Edit
  const handleEditButtonClick = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true); // Mở modal sửa sản phẩm
  };

  const handleConfirmEdit = async () => {
    try {
      // Chuyển đổi chuỗi kích thước thành mảng
      const sizesArray = Array.isArray(selectedProduct.sizes)
        ? selectedProduct.sizes
        : selectedProduct.sizes.split(",").map((size) => size.trim());
      // Lấy thông tin sản phẩm đã chỉnh sửa từ form
      const updatedProductData = {
        _id: selectedProduct._id, // ID của sản phẩm cần sửa
        name: selectedProduct.name, // Lấy giá trị từ input tên sản phẩm,
        images: selectedProduct.images, // Tiếp tục lấy thông tin các trường khác tương tự
        discount: selectedProduct.discount,
        price: selectedProduct.price,
        sizes: sizesArray, // Sử dụng mảng kích thước đã chia nhỏ
        colors: selectedProduct.colors,
        countInStock: selectedProduct.countInStock,
      };

      // Gửi request API để cập nhật thông tin sản phẩm
      dispatch(updateProduct(updatedProductData));
      setShowEditModal(false); // Đóng modal sau khi cập nhật thành công
      toast.success("Sửa sản phẩm thành công");
    } catch (error) {
      console.error("Lỗi khi sửa sản phẩm:", error);
      // Xử lý lỗi khi sửa sản phẩm
      toast.error("Đã có lỗi xảy ra khi sửa sản phẩm!");
    }
  };

  const handleCancelEdit = () => {
    setShowEditModal(false); // Đóng modal thêm sản phẩm
  };

  // Delete
  const handleDeleteButtonClick = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      // Gửi request API để xóa sản phẩm
      dispatch(deleteProduct(selectedProduct._id));
      setShowDeleteModal(false); // Đóng modal sau khi xóa thành công
      toast.success("Xóa sản phẩm thành công");
    } catch (error) {
      console.error("Lỗi khi xóa sản phẩm:", error);
      // Xử lý lỗi khi xóa sản phẩm
      toast.error("Đã có lỗi xảy ra khi xóa sản phẩm!");
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false); // Đóng modal khi người dùng hủy bỏ xóa sản phẩm
  };

  // Sử dụng useEffect để gọi action fetchOrder
  useEffect(() => {
    dispatch(fetchProducts());
  }, [status, dispatch]);

  return (
    <>
      <HeaderAdmin
        isNavbarVisible={isNavbarVisible}
        toggleNavbar={setNavbarVisible}
      />
      <div
        className={`${
          isNavbarVisible ? "w-[85%] px-[5%]" : "w-full px-[10%]"
        } h-auto float-end pt-20 bg-slate-50`}
      >
        <h1 className="py-10 font-bold text-[18px] text-[#474151]">
          Danh Sách Sản Phẩm
        </h1>
        <div className="w-full h-[80px] rounded-md border p-4 bg-white ">
          <button
            className="w-[150px] h-[45px] rounded-md self-center float-end 
          bg-[#10B981] text-white hover:bg-[#059669] duration-300 ease-in-out ml-4"
            onClick={handleAddButtonClick}
          >
            Thêm Sản Phẩm
          </button>
        </div>
        <div className="w-full h-auto rounded-md border px-4 my-5 bg-white">
          <table className="w-full text-[14px]">
            <thead>
              <tr className="grid grid-cols-9 mt-4 border p-2 place-items-center rounded-md bg-slate-50">
                <th>ID SẢN PHẨM</th>
                <th>HÌNH ẢNH</th>
                <th>TÊN SẢN PHẨM</th>
                <th>GIÁ BÁN</th>
                <th>GIÁ GỐC</th>
                <th>KHÍCH THƯỚC/ MÀU</th>
                <th>SỐ LƯỢNG</th>
                <th>TRẠNG THÁI</th>
                <th>HÀNH ĐỘNG</th>
              </tr>
            </thead>
            <thead>
              {displayedProducts.map((product) => (
                <tr
                  key={product._id}
                  className="grid grid-cols-9 mt-4 p-2 place-items-center "
                >
                  <th>{shortenId(product._id.toUpperCase())}</th>
                  <th className="mx-auto">
                    <img
                      src={product.images[0]}
                      alt=""
                      className="w-[80px] h-[120px] rounded-md object-cover"
                    />
                  </th>
                  <th>{product.name}</th>
                  <th> {formatCurrency(product.price)}</th>
                  <th> {formatCurrency(product.discount)}</th>

                  <th>
                    {product.sizes.join(", ")}/ {product.colors}
                  </th>
                  <th> {product.countInStock}</th>
                  <th>
                    {product.countInStock === 0 ? (
                      <span className="p-2 rounded-md text-[#FF4444] bg-[#FEE2E2]">
                        Bán hết
                      </span>
                    ) : (
                      <span className="p-2 rounded-md text-[#059669] bg-[#D1FAE5]">
                        Đang bán
                      </span>
                    )}
                  </th>
                  <th>
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className="w-4 h-4 p-4 
                    hover:text-green-500 duration-300 ease-in-out cursor-pointer"
                      onClick={() => handleEditButtonClick(product)}
                    />
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className="w-4 h-4 p-4
                  hover:text-red-500 duration-300 ease-in-out cursor-pointer"
                      onClick={() => handleDeleteButtonClick(product)}
                    />
                  </th>
                </tr>
              ))}
              <div className="leading-[50px] p-4 float-end cursor-pointer">
                {/* Tạo các nút chuyển trang */}
                {Array.from({ length: totalPages }).map((_, index) => (
                  <p
                    key={index}
                    className={`w-[40px] h-[40px] leading-[40px] text-center rounded-md inline-block ${
                      currentPage === index + 1
                        ? "hover:bg-[#059669] duration-300 ease-out bg-[#10B981] text-white mr-2"
                        : "hover:bg-[#F3F4F6] duration-300 ease-out bg-[#F3F4F6] text-black mr-2"
                    } `}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {/* Hiển thị số trang*/}
                    {index + 1}
                  </p>
                ))}
              </div>
            </thead>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-end bg-gray-900 bg-opacity-50">
          <div className="w-[80%] h-auto bg-white">
            {/* Form thêm sản phẩm */}
            <div className="w-full h-[60px] leading-[20px] p-4 border">
              <p className="font-bold text-[20px] text-[#059669]">
                Thêm Sản Phẩm
              </p>
              <p className="text-[14px]">
                Thêm sản phẩm của bạn và thông tin cần thiết từ đây
              </p>
            </div>
            <form className="grid grid-flow-row px-6 py-3">
              <div className="p-2">
                <p className="w-[20%] inline-block ">Tên Sản Phẩm</p>
                <input
                  type="text"
                  name="name"
                  value={productData.name}
                  onChange={handleInputChange}
                  placeholder="Nhập tên sản phẩm"
                  className="w-[80%] h-[50px] p-4 rounded-md border outline-none inline-block bg-[#F3F4F6] focus:bg-white"
                />
              </div>
              <div className="p-2">
                <p className="w-[20%] inline-block ">Hình ảnh</p>
                {/* Input cho phép nhập URL 1*/}
                <input
                  type="text"
                  name="image0"
                  value={productData.images[0]}
                  onChange={handleInputChange}
                  className="w-[80%] h-[50px] p-4 rounded-md border outline-none inline-block"
                  placeholder="Nhập URL ảnh 1"
                />
                <p className="w-[20%] inline-block "></p>
                {/* Input cho phép nhập URL 2*/}
                <input
                  type="text"
                  name="image1"
                  value={productData.images[1]}
                  onChange={handleInputChange}
                  className="w-[80%] h-[50px] p-4 rounded-md border outline-none inline-block mt-2"
                  placeholder="Nhập URL ảnh 2"
                />
                <p className="w-[20%] inline-block "></p>
                {/* Input cho phép nhập URL 3*/}
                <input
                  type="text"
                  name="image2"
                  value={productData.images[2]}
                  onChange={handleInputChange}
                  className="w-[80%] h-[50px] p-4 rounded-md border outline-none inline-block mt-2"
                  placeholder="Nhập URL ảnh 3"
                />
              </div>
              <div className="p-2 flex items-center">
                <p className="w-[20%]">Giá Gốc</p>
                <div className="w-[80%] relative">
                  <FontAwesomeIcon
                    icon={faDollarSign}
                    className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400"
                  />
                  <input
                    type="text"
                    name="discount"
                    value={productData.discount}
                    onChange={handleInputChange}
                    defaultValue={0}
                    className="w-full h-12 pl-10 pr-4 rounded-md border outline-none bg-gray-100 focus:bg-white"
                  />
                </div>
              </div>
              <div className="p-2 flex items-center">
                <p className="w-[20%]">Giá Bán</p>
                <div className="w-[80%] relative">
                  <FontAwesomeIcon
                    icon={faDollarSign}
                    className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400"
                  />
                  <input
                    type="text"
                    name="price"
                    value={productData.price}
                    onChange={handleInputChange}
                    defaultValue={0}
                    className="w-full h-12 pl-10 pr-4 rounded-md border outline-none bg-gray-100 focus:bg-white"
                  />
                </div>
              </div>

              <div className="p-2">
                <p className="w-[20%] inline-block ">Kích Thước</p>
                <input
                  type="text"
                  name="sizes"
                  value={productData.sizes}
                  onChange={handleInputChange}
                  placeholder="Nhập kích thước ( ngăn cách bằng dấu phẩy )"
                  className="w-[80%] h-[50px] p-4 rounded-md border outline-none inline-block bg-[#F3F4F6] focus:bg-white"
                />
              </div>
              <div className="p-2">
                <p className="w-[20%] inline-block ">Màu Sắc</p>
                <input
                  type="text"
                  name="colors"
                  value={productData.colors}
                  onChange={handleInputChange}
                  placeholder="Nhập màu sắc"
                  className="w-[80%] h-[50px] p-4 rounded-md border outline-none inline-block bg-[#F3F4F6] focus:bg-white"
                />
              </div>
              <div className="p-2">
                <p className="w-[20%] inline-block ">Số lượng</p>
                <input
                  type="text"
                  name="countInStock"
                  value={productData.countInStock}
                  onChange={handleInputChange}
                  defaultValue={0}
                  className="w-[80%] h-[50px] p-4 rounded-md border outline-none inline-block bg-[#F3F4F6] focus:bg-white"
                />
              </div>
            </form>

            <div className="grid grid-cols-2 px-4">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded-md mr-4
            hover:bg-gray-500 duration-300 ease-in-out"
                onClick={handleCancelAdd}
              >
                Hủy bỏ
              </button>
              <button
                className="px-4 py-2 bg-[#10B981] text-white rounded-md 
            hover:bg-[#059669] duration-300 ease-in-out"
                onClick={handleConfirmAdd}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-end bg-gray-900 bg-opacity-50">
          <div className="w-[80%] h-auto bg-white">
            {/* Form sửa sản phẩm */}
            <div className="w-full h-[60px] leading-[20px] p-4 border">
              <p className="font-bold text-[20px] text-[#059669]">
                Sửa Sản Phẩm
              </p>
              <p className="text-[14px]">Thay đổi thông tin sản phẩm tại đây</p>
            </div>
            <form className="grid grid-flow-row px-6 py-3">
              <div className="p-2">
                <p className="w-[20%] inline-block ">Tên Sản Phẩm</p>
                <input
                  type="text"
                  value={selectedProduct.name}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      name: e.target.value,
                    })
                  }
                  placeholder="Nhập tên sản phẩm"
                  className="w-[80%] h-[50px] p-4 rounded-md border outline-none inline-block bg-[#F3F4F6] focus:bg-white"
                />
              </div>
              <div className="p-2">
                <p className="w-[20%] inline-block">Hình ảnh</p>
                {/* Input cho phép nhập URL */}
                <input
                  type="text"
                  value={selectedProduct.images[0]}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      images: [
                        e.target.value,
                        selectedProduct.images[1],
                        selectedProduct.images[2],
                      ],
                    })
                  }
                  className="w-[80%] h-[50px] p-4 rounded-md border outline-none inline-block"
                  placeholder="Nhập URL ảnh 1"
                />
                <p className="w-[20%] inline-block "></p>
                {/* Input cho phép nhập URL */}
                <input
                  type="text"
                  value={selectedProduct.images[1]}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      images: [
                        selectedProduct.images[0],
                        e.target.value,
                        selectedProduct.images[2],
                      ],
                    })
                  }
                  className="w-[80%] h-[50px] p-4 rounded-md border outline-none inline-block mt-2"
                  placeholder="Nhập URL ảnh 2"
                />
                <p className="w-[20%] inline-block "></p>
                {/* Input cho phép nhập URL */}
                <input
                  type="text"
                  value={selectedProduct.images[2]}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      images: [
                        selectedProduct.images[0],
                        selectedProduct.images[1],
                        e.target.value,
                      ],
                    })
                  }
                  className="w-[80%] h-[50px] p-4 rounded-md border outline-none inline-block mt-2"
                  placeholder="Nhập URL ảnh 3"
                />
              </div>

              <div className="p-2 flex items-center">
                <p className="w-[20%]">Giá Gốc</p>
                <div className="w-[80%] relative">
                  <FontAwesomeIcon
                    icon={faDollarSign}
                    className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400"
                  />
                  <input
                    type="text"
                    value={selectedProduct.discount}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        discount: e.target.value,
                      })
                    }
                    className="w-full h-12 pl-10 pr-4 rounded-md border outline-none bg-gray-100 focus:bg-white"
                  />
                </div>
              </div>
              <div className="p-2 flex items-center">
                <p className="w-[20%]">Giá Bán</p>
                <div className="w-[80%] relative">
                  <FontAwesomeIcon
                    icon={faDollarSign}
                    className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400"
                  />
                  <input
                    type="text"
                    value={selectedProduct.price}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        price: e.target.value,
                      })
                    }
                    className="w-full h-12 pl-10 pr-4 rounded-md border outline-none bg-gray-100 focus:bg-white"
                  />
                </div>
              </div>

              <div className="p-2">
                <p className="w-[20%] inline-block ">Kích Thước</p>
                <input
                  type="text"
                  value={selectedProduct.sizes}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      sizes: e.target.value,
                    })
                  }
                  placeholder="Nhập kích thước (ngăn cách bằng dấu phẩy)"
                  className="w-[80%] h-[50px] p-4 rounded-md border outline-none inline-block bg-[#F3F4F6] focus:bg-white"
                />
              </div>
              <div className="p-2">
                <p className="w-[20%] inline-block ">Màu Sắc</p>
                <input
                  type="text"
                  value={selectedProduct.colors}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      colors: e.target.value,
                    })
                  }
                  placeholder="Nhập màu sắc (ngăn cách bằng dấu phẩy)"
                  className="w-[80%] h-[50px] p-4 rounded-md border outline-none inline-block bg-[#F3F4F6] focus:bg-white"
                />
              </div>
              <div className="p-2">
                <p className="w-[20%] inline-block ">Số lượng</p>
                <input
                  type="text"
                  value={selectedProduct.countInStock}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      countInStock: e.target.value,
                    })
                  }
                  className="w-[80%] h-[50px] p-4 rounded-md border outline-none inline-block bg-[#F3F4F6] focus:bg-white"
                />
              </div>
            </form>

            <div className="grid grid-cols-2 px-4">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded-md mr-4
      hover:bg-gray-500 duration-300 ease-in-out"
                onClick={handleCancelEdit}
              >
                Hủy bỏ
              </button>
              <button
                className="px-4 py-2 bg-[#10B981] text-white rounded-md 
      hover:bg-[#059669] duration-300 ease-in-out"
                onClick={handleConfirmEdit}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedProduct && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg p-6">
            <div className="text-center">
              <FontAwesomeIcon
                icon={faTrashCan}
                className="w-10 h-10 p-5
            text-red-500 duration-300 ease-in-out cursor-pointer"
              />
            </div>
            <p className="text-xl font-bold mb-4">
              Bạn có chắc muốn xóa sản phẩm
              <span className="text-red-500 ml-1">{selectedProduct.name} </span>
              ?
            </p>
            <p className="mb-4">
              Sản phẩm này sẽ không còn tồn tại trong danh sách nếu như bạn xác
              nhận xóa !
            </p>

            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded-md mr-4
            hover:bg-gray-500 duration-300 ease-in-out"
                onClick={handleCancelDelete}
              >
                Hủy bỏ
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md 
            hover:bg-red-700 duration-300 ease-in-out"
                onClick={handleConfirmDelete}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
