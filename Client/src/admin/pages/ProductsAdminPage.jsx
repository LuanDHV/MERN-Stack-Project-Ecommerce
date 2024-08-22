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
        } float-end h-auto bg-slate-50 pt-20`}
      >
        <h1 className="py-10 text-[18px] font-bold text-[#474151]">
          Danh Sách Sản Phẩm
        </h1>
        <div className="h-[80px] w-full rounded-md border bg-white p-4">
          <button
            className="float-end ml-4 h-[45px] w-[150px] self-center rounded-md bg-[#10B981] text-white duration-300 ease-in-out hover:bg-[#059669]"
            onClick={handleAddButtonClick}
          >
            Thêm Sản Phẩm
          </button>
        </div>
        <div className="my-5 h-auto w-full rounded-md border bg-white px-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="mt-4 grid grid-cols-9 place-items-center rounded-md border bg-slate-50 p-2">
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
                  className="mt-4 grid grid-cols-9 place-items-center p-2"
                >
                  <th>{shortenId(product._id.toUpperCase())}</th>
                  <th className="mx-auto">
                    <img
                      src={product.images[0]}
                      alt=""
                      className="h-[120px] w-[80px] rounded-md object-cover"
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
                      <span className="rounded-md bg-[#FEE2E2] p-2 text-[#FF4444]">
                        Bán hết
                      </span>
                    ) : (
                      <span className="rounded-md bg-[#D1FAE5] p-2 text-[#059669]">
                        Đang bán
                      </span>
                    )}
                  </th>
                  <th>
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className="h-4 w-4 cursor-pointer p-4 duration-300 ease-in-out hover:text-green-500"
                      onClick={() => handleEditButtonClick(product)}
                    />
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className="h-4 w-4 cursor-pointer p-4 duration-300 ease-in-out hover:text-red-500"
                      onClick={() => handleDeleteButtonClick(product)}
                    />
                  </th>
                </tr>
              ))}
              <div className="float-end cursor-pointer p-4 leading-[50px]">
                {/* Tạo các nút chuyển trang */}
                {Array.from({ length: totalPages }).map((_, index) => (
                  <p
                    key={index}
                    className={`inline-block h-10 w-[40px] rounded-md text-center ${
                      currentPage === index + 1
                        ? "mr-2 bg-[#10B981] text-white duration-300 ease-out hover:bg-[#059669]"
                        : "mr-2 bg-[#F3F4F6] text-black duration-300 ease-out hover:bg-[#F3F4F6]"
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
        <div className="fixed left-0 top-0 flex h-full w-full justify-end bg-gray-900 bg-opacity-50">
          <div className="h-auto w-[80%] bg-white">
            {/* Form thêm sản phẩm */}
            <div className="h-[60px] w-full border p-4 leading-[20px]">
              <p className="text-[20px] font-bold text-[#059669]">
                Thêm Sản Phẩm
              </p>
              <p className="text-sm">
                Thêm sản phẩm của bạn và thông tin cần thiết từ đây
              </p>
            </div>
            <form className="grid grid-flow-row px-6 py-3">
              <div className="p-2">
                <p className="inline-block w-[20%]">Tên Sản Phẩm</p>
                <input
                  type="text"
                  name="name"
                  value={productData.name}
                  onChange={handleInputChange}
                  placeholder="Nhập tên sản phẩm"
                  className="inline-block h-[50px] w-[80%] rounded-md border bg-[#F3F4F6] p-4 outline-none focus:bg-white"
                />
              </div>
              <div className="p-2">
                <p className="inline-block w-[20%]">Hình ảnh</p>
                {/* Input cho phép nhập URL 1*/}
                <input
                  type="text"
                  name="image0"
                  value={productData.images[0]}
                  onChange={handleInputChange}
                  className="inline-block h-[50px] w-[80%] rounded-md border p-4 outline-none"
                  placeholder="Nhập URL ảnh 1"
                />
                <p className="inline-block w-[20%]"></p>
                {/* Input cho phép nhập URL 2*/}
                <input
                  type="text"
                  name="image1"
                  value={productData.images[1]}
                  onChange={handleInputChange}
                  className="mt-2 inline-block h-[50px] w-[80%] rounded-md border p-4 outline-none"
                  placeholder="Nhập URL ảnh 2"
                />
                <p className="inline-block w-[20%]"></p>
                {/* Input cho phép nhập URL 3*/}
                <input
                  type="text"
                  name="image2"
                  value={productData.images[2]}
                  onChange={handleInputChange}
                  className="mt-2 inline-block h-[50px] w-[80%] rounded-md border p-4 outline-none"
                  placeholder="Nhập URL ảnh 3"
                />
              </div>
              <div className="flex items-center p-2">
                <p className="w-[20%]">Giá Gốc</p>
                <div className="relative w-[80%]">
                  <FontAwesomeIcon
                    icon={faDollarSign}
                    className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
                  />
                  <input
                    type="text"
                    name="discount"
                    value={productData.discount}
                    onChange={handleInputChange}
                    defaultValue={0}
                    className="h-12 w-full rounded-md border bg-gray-100 pl-10 pr-4 outline-none focus:bg-white"
                  />
                </div>
              </div>
              <div className="flex items-center p-2">
                <p className="w-[20%]">Giá Bán</p>
                <div className="relative w-[80%]">
                  <FontAwesomeIcon
                    icon={faDollarSign}
                    className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
                  />
                  <input
                    type="text"
                    name="price"
                    value={productData.price}
                    onChange={handleInputChange}
                    defaultValue={0}
                    className="h-12 w-full rounded-md border bg-gray-100 pl-10 pr-4 outline-none focus:bg-white"
                  />
                </div>
              </div>

              <div className="p-2">
                <p className="inline-block w-[20%]">Kích Thước</p>
                <input
                  type="text"
                  name="sizes"
                  value={productData.sizes}
                  onChange={handleInputChange}
                  placeholder="Nhập kích thước ( ngăn cách bằng dấu phẩy )"
                  className="inline-block h-[50px] w-[80%] rounded-md border bg-[#F3F4F6] p-4 outline-none focus:bg-white"
                />
              </div>
              <div className="p-2">
                <p className="inline-block w-[20%]">Màu Sắc</p>
                <input
                  type="text"
                  name="colors"
                  value={productData.colors}
                  onChange={handleInputChange}
                  placeholder="Nhập màu sắc"
                  className="inline-block h-[50px] w-[80%] rounded-md border bg-[#F3F4F6] p-4 outline-none focus:bg-white"
                />
              </div>
              <div className="p-2">
                <p className="inline-block w-[20%]">Số lượng</p>
                <input
                  type="text"
                  name="countInStock"
                  value={productData.countInStock}
                  onChange={handleInputChange}
                  defaultValue={0}
                  className="inline-block h-[50px] w-[80%] rounded-md border bg-[#F3F4F6] p-4 outline-none focus:bg-white"
                />
              </div>
            </form>

            <div className="grid grid-cols-2 px-4">
              <button
                className="mr-4 rounded-md bg-gray-400 px-4 py-2 text-white duration-300 ease-in-out hover:bg-gray-500"
                onClick={handleCancelAdd}
              >
                Hủy bỏ
              </button>
              <button
                className="rounded-md bg-[#10B981] px-4 py-2 text-white duration-300 ease-in-out hover:bg-[#059669]"
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
        <div className="fixed left-0 top-0 flex h-full w-full justify-end bg-gray-900 bg-opacity-50">
          <div className="h-auto w-[80%] bg-white">
            {/* Form sửa sản phẩm */}
            <div className="h-[60px] w-full border p-4 leading-[20px]">
              <p className="text-[20px] font-bold text-[#059669]">
                Sửa Sản Phẩm
              </p>
              <p className="text-sm">Thay đổi thông tin sản phẩm tại đây</p>
            </div>
            <form className="grid grid-flow-row px-6 py-3">
              <div className="p-2">
                <p className="inline-block w-[20%]">Tên Sản Phẩm</p>
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
                  className="inline-block h-[50px] w-[80%] rounded-md border bg-[#F3F4F6] p-4 outline-none focus:bg-white"
                />
              </div>
              <div className="p-2">
                <p className="inline-block w-[20%]">Hình ảnh</p>
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
                  className="inline-block h-[50px] w-[80%] rounded-md border p-4 outline-none"
                  placeholder="Nhập URL ảnh 1"
                />
                <p className="inline-block w-[20%]"></p>
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
                  className="mt-2 inline-block h-[50px] w-[80%] rounded-md border p-4 outline-none"
                  placeholder="Nhập URL ảnh 2"
                />
                <p className="inline-block w-[20%]"></p>
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
                  className="mt-2 inline-block h-[50px] w-[80%] rounded-md border p-4 outline-none"
                  placeholder="Nhập URL ảnh 3"
                />
              </div>

              <div className="flex items-center p-2">
                <p className="w-[20%]">Giá Gốc</p>
                <div className="relative w-[80%]">
                  <FontAwesomeIcon
                    icon={faDollarSign}
                    className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
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
                    className="h-12 w-full rounded-md border bg-gray-100 pl-10 pr-4 outline-none focus:bg-white"
                  />
                </div>
              </div>
              <div className="flex items-center p-2">
                <p className="w-[20%]">Giá Bán</p>
                <div className="relative w-[80%]">
                  <FontAwesomeIcon
                    icon={faDollarSign}
                    className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
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
                    className="h-12 w-full rounded-md border bg-gray-100 pl-10 pr-4 outline-none focus:bg-white"
                  />
                </div>
              </div>

              <div className="p-2">
                <p className="inline-block w-[20%]">Kích Thước</p>
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
                  className="inline-block h-[50px] w-[80%] rounded-md border bg-[#F3F4F6] p-4 outline-none focus:bg-white"
                />
              </div>
              <div className="p-2">
                <p className="inline-block w-[20%]">Màu Sắc</p>
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
                  className="inline-block h-[50px] w-[80%] rounded-md border bg-[#F3F4F6] p-4 outline-none focus:bg-white"
                />
              </div>
              <div className="p-2">
                <p className="inline-block w-[20%]">Số lượng</p>
                <input
                  type="text"
                  value={selectedProduct.countInStock}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      countInStock: e.target.value,
                    })
                  }
                  className="inline-block h-[50px] w-[80%] rounded-md border bg-[#F3F4F6] p-4 outline-none focus:bg-white"
                />
              </div>
            </form>

            <div className="grid grid-cols-2 px-4">
              <button
                className="mr-4 rounded-md bg-gray-400 px-4 py-2 text-white duration-300 ease-in-out hover:bg-gray-500"
                onClick={handleCancelEdit}
              >
                Hủy bỏ
              </button>
              <button
                className="rounded-md bg-[#10B981] px-4 py-2 text-white duration-300 ease-in-out hover:bg-[#059669]"
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
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="rounded-lg bg-white p-6">
            <div className="text-center">
              <FontAwesomeIcon
                icon={faTrashCan}
                className="h-10 w-10 cursor-pointer p-5 text-red-500 duration-300 ease-in-out"
              />
            </div>
            <p className="mb-4 text-xl font-bold">
              Bạn có chắc muốn xóa sản phẩm
              <span className="ml-1 text-red-500">{selectedProduct.name} </span>
              ?
            </p>
            <p className="mb-4">
              Sản phẩm này sẽ không còn tồn tại trong danh sách nếu như bạn xác
              nhận xóa !
            </p>

            <div className="flex justify-end">
              <button
                className="mr-4 rounded-md bg-gray-400 px-4 py-2 text-white duration-300 ease-in-out hover:bg-gray-500"
                onClick={handleCancelDelete}
              >
                Hủy bỏ
              </button>
              <button
                className="rounded-md bg-red-500 px-4 py-2 text-white duration-300 ease-in-out hover:bg-red-700"
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
