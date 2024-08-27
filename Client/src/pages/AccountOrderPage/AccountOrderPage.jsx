import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUserOrders } from "../../features/order/orderSlice";
import useCurrencyFormatter from "../../hooks/useCurrencyFormatter";

// Trang Đăng Nhập
export default function AccountOrderPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const allOrders = useSelector((state) => state.order.userOrders);

  // Lọc đơn hàng dựa trên userId
  const userOrders = allOrders.filter((order) => order.userID === user.userId);
  // Định dạng tiền tệ
  const { formatCurrency } = useCurrencyFormatter();

  // Check userID
  // console.log(user.userId);

  // Thêm state để theo dõi trang hiện tại
  const [currentPage, setCurrentPage] = useState(1);

  // Số đơn hàng mỗi trang
  const ordersPerPage = 10;

  // Tính toán số trang
  const totalPages = Math.ceil(userOrders.length / ordersPerPage);

  // Tính toán đơn hàng hiển thị trên trang hiện tại
  const startIndex = (currentPage - 1) * ordersPerPage;
  const endIndex = startIndex + ordersPerPage;
  const displayedOrders = userOrders.slice(startIndex, endIndex);

  // Hàm chuyển trang
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Hàm rút ngắn độ dài ID
  const shortenId = (id) => id.slice(0, 8);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  return (
    <>
      <section>
        <div className="mx-auto mt-20 h-12 w-full border-t border-[#EFEFF4]">
          <div className="mx-auto w-5/6 text-sm font-light">
            <Link to="/" className="">
              TRANG CHỦ
            </Link>
            <span> /TÀI KHOẢN</span>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto my-10 h-auto w-full">
          <div className="grid grid-flow-row xl:grid-flow-col">
            <div className="mx-auto h-auto w-5/6 text-center">
              <div className="p-4">
                <p className="mb-5 text-2xl">
                  Xin Chào
                  <span className="block text-3xl font-bold">
                    {user.username}
                  </span>
                </p>
                <ul>
                  <li className="text-gray-600">
                    <Link to="/account">Thông tin tài khoản</Link>
                  </li>
                  <li className="text-gray-600">
                    <Link to="/account-order">Quản lí đơn hàng</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="h-auto w-full border-l-2 p-4 xl:mt-20">
              <div className="mx-auto h-auto w-full text-sm text-gray-600">
                <table className="w-full">
                  <thead>
                    <tr className="grid w-full grid-cols-4 border-b-2 text-black">
                      <th className="">MÃ ĐƠN HÀNG</th>
                      <th className="">NGÀY ĐẶT</th>
                      <th className="">TỔNG TIỀN</th>
                      <th className="">TRẠNG THÁI ĐƠN HÀNG</th>
                    </tr>
                  </thead>
                  <thead>
                    {displayedOrders.map((orderItem) => (
                      <tr key={orderItem._id} className="grid grid-cols-4">
                        <th>#{shortenId(orderItem._id.toUpperCase())}</th>
                        <th>
                          {`${new Intl.DateTimeFormat("vi-VN", {
                            hour: "numeric",
                            minute: "numeric",
                          }).format(
                            new Date(orderItem.createdAt),
                          )} ${new Intl.DateTimeFormat("vi-VN", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }).format(new Date(orderItem.createdAt))}`}
                        </th>
                        <th>{formatCurrency(orderItem.totalPrice)}</th>
                        <th>{orderItem.status}</th>
                      </tr>
                    ))}
                  </thead>
                </table>
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
      </section>
    </>
  );
}
