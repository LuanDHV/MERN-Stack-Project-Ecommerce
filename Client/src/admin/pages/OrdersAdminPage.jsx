import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useCurrencyFormatter from "../../hooks/useCurrencyFormatter";
import HeaderAdmin from "../components/HeaderAdmin";
import {
  fetchOrders,
  updateOrder,
  deleteOrder,
} from "../../features/order/orderSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function OrdersAdminPage() {
  // Sử dụng useDispatch để gửi các action đến Redux store và useSelector để lấy state từ Redux store
  const dispatch = useDispatch();
  // Định dạng tiền tệ
  const { formatCurrency } = useCurrencyFormatter();
  const [isNavbarVisible, setNavbarVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDropdown, setShowDropdown] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Lấy danh sách đơn hàng từ store
  const orders = useSelector((state) => state.order.orders);

  // Thêm state để theo dõi trang hiện tại
  const [currentPage, setCurrentPage] = useState(1);

  // Số đơn hàng mỗi trang
  const ordersPerPage = 10;

  // Tính toán số trang
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  // Tính toán đơn hàng hiển thị trên trang hiện tại
  const startIndex = (currentPage - 1) * ordersPerPage;
  const endIndex = startIndex + ordersPerPage;
  const displayedOrders = orders.slice(startIndex, endIndex);

  // Hàm chuyển trang
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Hàm rút ngắn độ dài ID
  const shortenId = (id) => id.slice(0, 8);

  // Hàm xử lý khi người dùng nhấn vào button cập nhật trạng thái
  const handleUpdateButtonClick = (order) => {
    // Nếu dropdown đã được mở ra từ button đó, thì đóng dropdown
    if (showDropdown === order._id) {
      setShowDropdown(null);
    } else {
      setSelectedOrder(order);
      setShowDropdown(order._id);
    }
  };

  // Khi người dùng chọn một trạng thái từ dropdown, bạn cần cập nhật trạng thái cho đơn hàng
  const handleStatusUpdate = (orderId, status) => {
    // Cập nhật trạng thái của đơn hàng ở đây, ví dụ:
    toast.success("Cập nhật trạng thái của đơn hàng thành công");
    // Gửi action đến Redux store để cập nhật trạng thái đơn hàng
    dispatch(updateOrder({ _id: orderId, status }));

    // Sau khi cập nhật, bạn có thể ẩn dropdown
    setShowDropdown(null);
  };

  // Delete
  const handleDeleteButtonClick = (order) => {
    setSelectedOrder(order);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      // Gửi request API để xóa đơn hàng
      dispatch(deleteOrder(selectedOrder._id));
      setShowDeleteModal(false); // Đóng modal sau khi xóa thành công
      toast.success("Xóa đơn hàng thành công");
    } catch (error) {
      console.error("Lỗi khi xóa đơn hàng:", error);
      // Xử lý lỗi khi xóa đơn hàng
      toast.error("Đã có lỗi xảy ra khi xóa đơn hàng!");
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false); // Đóng modal khi người dùng hủy bỏ xóa đơn hàng
  };

  // Sử dụng useEffect để gọi action fetchOrders
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <>
      <HeaderAdmin
        isNavbarVisible={isNavbarVisible}
        toggleNavbar={setNavbarVisible}
      />
      <div
        className={`${
          isNavbarVisible ? "w-[85%] px-[5%]" : "w-full px-[10%]"
        } h-auto float-end  pt-20 `}
      >
        <h1 className="py-5 font-bold text-[18px] text-[#474151]">
          Danh Sách Đơn Hàng
        </h1>
        <div className="w-full h-auto rounded-md border px-4 my-5 bg-white">
          <table className="w-full text-[14px]">
            <thead>
              <tr className="grid grid-cols-7 mt-4 border p-2 place-items-center rounded-md bg-slate-50">
                <th>ID ĐƠN HÀNG</th>
                <th>THỜI GIAN ĐẶT</th>
                <th>TÊN KHÁCH HÀNG</th>
                <th>PHƯƠNG THỨC</th>
                <th>TỔNG GIÁ</th>
                <th>TRẠNG THÁI</th>
                <th>HÀNH ĐỘNG</th>
              </tr>
            </thead>
            <thead>
              {displayedOrders.map((order) => (
                <tr
                  key={order._id}
                  className="grid grid-cols-7 mt-4 p-2 place-items-center "
                >
                  <th>{shortenId(order._id.toUpperCase())}</th>
                  <th>
                    {`${new Intl.DateTimeFormat("vi-VN", {
                      hour: "numeric",
                      minute: "numeric",
                    }).format(
                      new Date(order.createdAt)
                    )} ${new Intl.DateTimeFormat("vi-VN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }).format(new Date(order.createdAt))}`}
                  </th>
                  <th>{order.fullName}</th>
                  <th>{order.payment}</th>
                  <th>{formatCurrency(order.totalPrice)}</th>
                  <th>
                    <div className="relative">
                      <button
                        className={`w-[200px] p-2 rounded-md hover:bg-gray-300 duration-300 ease-in-out ${
                          order.status === "Đơn hàng đã xác nhận"
                            ? "bg-[#FEF9C3] text-[#CA8A04]"
                            : order.status === "Đơn hàng đang vận chuyển"
                            ? "bg-[#D8EAFE] text-[#3B82F6]"
                            : order.status === "Đơn hàng đã hoàn thành"
                            ? "bg-[#D1FAE5] text-[#059669]"
                            : "bg-gray-200"
                        }`}
                        onClick={() => handleUpdateButtonClick(order)}
                      >
                        {order.status}
                      </button>
                      {showDropdown === order._id && (
                        <ul className="absolute bg-white rounded-md shadow-lg top-10 right-0 z-10 w-full">
                          <li>
                            <button
                              className="block px-4 py-2 text-gray-800 hover:bg-gray-200 duration-300 ease-in-out w-full"
                              onClick={() =>
                                handleStatusUpdate(
                                  order._id,
                                  "Đơn hàng đã xác nhận"
                                )
                              }
                            >
                              Đã được xác nhận
                            </button>
                          </li>
                          <li>
                            <button
                              className="block px-4 py-2 text-gray-800 hover:bg-gray-200 duration-300 ease-in-out w-full"
                              onClick={() =>
                                handleStatusUpdate(
                                  order._id,
                                  "Đơn hàng đang vận chuyển"
                                )
                              }
                            >
                              Đang được vận chuyển
                            </button>
                          </li>
                          <li>
                            <button
                              className="block px-4 py-2 text-gray-800 hover:bg-gray-200 duration-300 ease-in-out w-full"
                              onClick={() =>
                                handleStatusUpdate(
                                  order._id,
                                  "Đơn hàng đã hoàn thành"
                                )
                              }
                            >
                              Đã hoàn thành
                            </button>
                          </li>
                        </ul>
                      )}
                    </div>
                  </th>

                  <th>
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className="w-4 h-4 p-4
                  hover:text-red-500 duration-300 ease-in-out cursor-pointer"
                      onClick={() => handleDeleteButtonClick(order)}
                    />
                  </th>
                </tr>
              ))}
            </thead>
          </table>
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
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && selectedOrder && (
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
              Bạn có chắc muốn xóa đơn hàng
              <span className="text-red-500 ml-1">
                {selectedOrder._id.toUpperCase()}
              </span>
              ?
            </p>
            <p className="mb-4">
              Đơn hàng này sẽ không còn tồn tại trong danh sách nếu như bạn xác
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
