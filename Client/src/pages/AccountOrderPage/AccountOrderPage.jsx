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
        <div className="w-full h-[49px] mx-auto mt-[92px] border-t border-[#EFEFF4]">
          <div className="text-[14px] leading-[49px] font-light px-[60px] ">
            <Link to="/" className="ml-[60px]">
              TRANG CHỦ
            </Link>
            <span> /TÀI KHOẢN</span>
          </div>
        </div>
      </section>

      <section>
        <div className="w-[1330px] h-auto mx-auto my-10">
          <div className=" grid grid-flow-col">
            <div className="w-[400px] h-[200px] pl-[30px]">
              <div className="p-4">
                <p className="mb-5 text-[28px]">
                  Xin Chào
                  <span className="block font-bold text-[32px]">
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

            <div className="w-[930px] h-auto border-l-2 p-4 mt-20">
              <div className="pl-[30px] text-gray-600 text-[14px] h-auto">
                <table>
                  <thead>
                    <tr className="border-b-2 text-black">
                      <th className="w-[200px] h-[50px] px-6">MÃ ĐƠN HÀNG</th>
                      <th className="w-[200px] h-[50px] px-6">NGÀY ĐẶT</th>
                      <th className="w-[200px] h-[50px] px-6">TỔNG TIỀN</th>
                      <th className="w-[300px] h-[50px] px-6">
                        TRẠNG THÁI ĐƠN HÀNG
                      </th>
                    </tr>
                  </thead>
                  <thead>
                    {displayedOrders.map((orderItem) => (
                      <tr key={orderItem._id}>
                        <th>#{shortenId(orderItem._id.toUpperCase())}</th>
                        <th>
                          {`${new Intl.DateTimeFormat("vi-VN", {
                            hour: "numeric",
                            minute: "numeric",
                          }).format(
                            new Date(orderItem.createdAt)
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
                <div className="w-[270px] h-auto mx-auto grid grid-cols-5 place-items-center font-bold mt-5">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <div
                      key={index}
                      className={`w-[40px] h-[40px] cursor-pointer text-center leading-[40px] border border-[#f8f8f9] rounded
                        ${
                          currentPage === index + 1
                            ? "hover:text-white hover:bg-[#070707] bg-[#070707] text-white"
                            : "hover:text-white hover:bg-[#070707] bg-[#f8f8f9] text-black"
                        } `}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      <span>{index + 1}</span>
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
