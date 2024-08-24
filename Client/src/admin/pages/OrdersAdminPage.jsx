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
        } float-end h-auto pt-20`}
      >
        <h1 className="py-5 text-lg font-bold text-[#474151]">
          Danh Sách Đơn Hàng
        </h1>
        <div className="my-5 h-auto w-full rounded-md border bg-white px-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="mt-4 grid grid-cols-7 place-items-center rounded-md border bg-slate-50 p-2">
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
                  className="mt-4 grid grid-cols-7 place-items-center p-2"
                >
                  <th>{shortenId(order._id.toUpperCase())}</th>
                  <th>
                    {`${new Intl.DateTimeFormat("vi-VN", {
                      hour: "numeric",
                      minute: "numeric",
                    }).format(
                      new Date(order.createdAt),
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
                        className={`w-[200px] rounded-md p-2 duration-300 ease-in-out hover:bg-gray-300 ${
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
                        <ul className="absolute right-0 top-10 z-10 w-full rounded-md bg-white shadow-lg">
                          <li>
                            <button
                              className="block w-full px-4 py-2 text-gray-800 duration-300 ease-in-out hover:bg-gray-200"
                              onClick={() =>
                                handleStatusUpdate(
                                  order._id,
                                  "Đơn hàng đã xác nhận",
                                )
                              }
                            >
                              Đã được xác nhận
                            </button>
                          </li>
                          <li>
                            <button
                              className="block w-full px-4 py-2 text-gray-800 duration-300 ease-in-out hover:bg-gray-200"
                              onClick={() =>
                                handleStatusUpdate(
                                  order._id,
                                  "Đơn hàng đang vận chuyển",
                                )
                              }
                            >
                              Đang được vận chuyển
                            </button>
                          </li>
                          <li>
                            <button
                              className="block w-full px-4 py-2 text-gray-800 duration-300 ease-in-out hover:bg-gray-200"
                              onClick={() =>
                                handleStatusUpdate(
                                  order._id,
                                  "Đơn hàng đã hoàn thành",
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
                      className="h-4 w-4 cursor-pointer p-4 duration-300 ease-in-out hover:text-red-500"
                      onClick={() => handleDeleteButtonClick(order)}
                    />
                  </th>
                </tr>
              ))}
            </thead>
          </table>
          <div className="float-end cursor-pointer p-4 leading-[50px]">
            {/* Tạo các nút chuyển trang */}
            {Array.from({ length: totalPages }).map((_, index) => (
              <p
                key={index}
                className={`inline-block h-10 w-10 rounded-md text-center ${
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
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && selectedOrder && (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="rounded-lg bg-white p-6">
            <div className="text-center">
              <FontAwesomeIcon
                icon={faTrashCan}
                className="h-10 w-10 cursor-pointer p-5 text-red-500 duration-300 ease-in-out"
              />
            </div>
            <p className="mb-4 text-xl font-bold">
              Bạn có chắc muốn xóa đơn hàng
              <span className="ml-1 text-red-500">
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
