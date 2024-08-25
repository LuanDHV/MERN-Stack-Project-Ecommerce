import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useCurrencyFormatter from "../../hooks/useCurrencyFormatter";
import HeaderAdmin from "../components/HeaderAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faCheck,
  faCreditCard,
  faMoneyCheckDollar,
  faRotate,
  faTruck,
} from "@fortawesome/free-solid-svg-icons";
import { fetchOrders } from "../../features/order/orderSlice";

export default function HomeAdminPage() {
  // Sử dụng useDispatch để gửi các action đến Redux store và useSelector để lấy state từ Redux store
  const dispatch = useDispatch();
  // Định dạng tiền tệ
  const { formatCurrency } = useCurrencyFormatter();
  const [isNavbarVisible, setNavbarVisible] = useState(false);

  // Lấy danh sách đơn hàng từ store
  const orders = useSelector((state) => state.order.orders);

  // Biến để lưu trữ tổng giá trị của các đơn hàng theo từng khoảng thời gian
  let todayTotal = 0;
  let yesterdayTotal = 0;
  let thisMonthTotal = 0;
  let lastMonthTotal = 0;

  // Ngày hôm nay
  const today = new Date();
  // Ngày hôm qua
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  // Tháng hiện tại
  const thisMonth = today.getMonth() + 1;
  // Tháng trước
  const lastMonth = thisMonth === 1 ? 12 : thisMonth - 1;

  // Duyệt qua mảng đơn hàng và tính tổng giá trị theo từng khoảng thời gian
  orders.forEach((order) => {
    const orderDate = new Date(order.createdAt);
    const orderMonth = orderDate.getMonth() + 1;

    if (orderDate.toDateString() === today.toDateString()) {
      todayTotal += order.totalPrice;
    }

    if (orderDate.toDateString() === yesterday.toDateString()) {
      yesterdayTotal += order.totalPrice;
    }

    if (
      orderMonth === thisMonth &&
      orderDate.getFullYear() === today.getFullYear()
    ) {
      thisMonthTotal += order.totalPrice;
    }

    if (
      orderMonth === lastMonth &&
      orderDate.getFullYear() === today.getFullYear()
    ) {
      lastMonthTotal += order.totalPrice;
    }
  });

  // Biến để lưu trữ tổng doanh thu
  let totalRevenue = 0;

  // Duyệt qua mảng đơn hàng và tính tổng doanh thu
  orders.forEach((order) => {
    totalRevenue += order.totalPrice;
  });

  // Biến để lưu trữ số lượng của mỗi trạng thái đơn hàng
  let unconfirmedOrdersCount = 0;
  let confirmedOrdersCount = 0;
  let inTransitOrdersCount = 0;
  let completedOrdersCount = 0;

  // Duyệt qua mảng đơn hàng và kiểm tra trạng thái
  orders.forEach((order) => {
    if (order.status === "Đã đặt hàng, đợi xác nhận") {
      unconfirmedOrdersCount++;
    }
    if (order.status === "Đơn hàng đã xác nhận") {
      confirmedOrdersCount++;
    }
    if (order.status === "Đơn hàng đang vận chuyển") {
      inTransitOrdersCount++;
    }
    if (order.status === "Đơn hàng đã hoàn thành") {
      completedOrdersCount++;
    }
  });

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
          isNavbarVisible ? "ml-auto w-5/6" : "w-full"
        } h-auto overflow-hidden bg-slate-50 px-5 pt-20`}
      >
        <h1 className="py-5 text-lg font-bold text-[#474151]">
          Trang Chủ ADMIN
        </h1>
        <div className="grid gap-5 md:grid-cols-5">
          <div className="h-auto w-full rounded-md bg-[#0D9488] p-6">
            <div className="text-center text-white">
              <FontAwesomeIcon icon={faMoneyCheckDollar} className="h-8 w-8" />
              <p className="my-5">Doanh Thu Hôm Nay</p>
              <p className="text-2xl font-bold">{formatCurrency(todayTotal)}</p>
            </div>
          </div>
          <div className="h-auto w-full rounded-md bg-[#FB923C] p-6">
            <div className="text-center text-white">
              <FontAwesomeIcon icon={faMoneyCheckDollar} className="h-8 w-8" />
              <p className="my-5">Doanh Thu Hôm Trước</p>
              <p className="text-2xl font-bold">
                {formatCurrency(yesterdayTotal)}
              </p>
            </div>
          </div>
          <div className="h-auto w-full rounded-md bg-[#3B82F6] p-6">
            <div className="text-center text-white">
              <FontAwesomeIcon icon={faCartShopping} className="h-8 w-8" />
              <p className="my-5">Doanh Thu Tháng Này</p>
              <p className="text-2xl font-bold">
                {formatCurrency(thisMonthTotal)}
              </p>
            </div>
          </div>
          <div className="h-auto w-full rounded-md bg-[#0891B2] p-6">
            <div className="text-center text-white">
              <FontAwesomeIcon icon={faCreditCard} className="h-8 w-8" />
              <p className="my-5">Doanh Thu Tháng Trước</p>
              <p className="text-2xl font-bold">
                {formatCurrency(lastMonthTotal)}
              </p>
            </div>
          </div>
          <div className="h-auto w-full rounded-md bg-[#059669] p-6">
            <div className="text-center text-white">
              <FontAwesomeIcon icon={faCreditCard} className="h-8 w-8" />
              <p className="my-5">Tổng Doanh Thu</p>
              <p className="text-2xl font-bold">
                {formatCurrency(totalRevenue)}
              </p>
            </div>
          </div>
        </div>
        <div className="my-10 grid gap-5 md:grid-cols-4">
          <div className="grid h-auto grid-flow-col rounded-md border bg-white">
            <div className="w-full self-center pl-5">
              <p className="h-12 w-12 rounded-full bg-[#FFEDD5]">
                <FontAwesomeIcon
                  icon={faCartShopping}
                  className="p-4 text-red-400"
                />
              </p>
            </div>
            <div className="w-[260px] p-3">
              <span className="block">Đã đặt hàng, đợi xác nhận</span>
              <span className="block text-2xl font-bold">
                {unconfirmedOrdersCount}
              </span>
            </div>
          </div>
          <div className="grid h-auto grid-flow-col rounded-md border bg-white">
            <div className="w-full self-center pl-5">
              <p className="h-12 w-12 rounded-full bg-[#DBEAFE]">
                <FontAwesomeIcon
                  icon={faRotate}
                  className="p-4 text-slate-500"
                />
              </p>
            </div>
            <div className="w-[260px] p-3">
              <span className="block">Đơn hàng đã xác nhận</span>
              <span className="block text-2xl font-bold">
                {confirmedOrdersCount}
              </span>
            </div>
          </div>
          <div className="grid h-auto grid-flow-col rounded-md border bg-white">
            <div className="w-full self-center pl-5">
              <p className="h-12 w-12 rounded-full bg-[#CCFBF1]">
                <FontAwesomeIcon icon={faTruck} className="p-4 text-teal-600" />
              </p>
            </div>
            <div className="w-[260px] p-3">
              <span className="block">Đơn hàng đang vận chuyển</span>
              <span className="block text-2xl font-bold">
                {inTransitOrdersCount}
              </span>
            </div>
          </div>
          <div className="grid h-auto grid-flow-col rounded-md border bg-white">
            <div className="w-full self-center pl-5">
              <p className="h-12 w-12 rounded-full bg-[#D1FED5]">
                <FontAwesomeIcon
                  icon={faCheck}
                  className="p-4 text-green-700"
                />
              </p>
            </div>
            <div className="w-[260px] p-3">
              <span className="block">Đơn hàng đã hoàn thành</span>
              <span className="block text-2xl font-bold">
                {completedOrdersCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
