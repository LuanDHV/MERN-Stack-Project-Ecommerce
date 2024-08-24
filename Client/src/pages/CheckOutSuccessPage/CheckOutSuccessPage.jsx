import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import useCurrencyFormatter from "../../hooks/useCurrencyFormatter";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { postOrderToAPI, clearOrder } from "../../features/order/orderSlice";
import { clearCart } from "../../features/cart/cartSlice";

export default function CheckOutSuccessPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const order = useSelector((state) => state.order);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.user);

  // Định dạng tiền tệ
  const { formatCurrency } = useCurrencyFormatter();

  useEffect(() => {
    const orderData = {
      userID: user && user.userId,
      products: cart.items,
      totalPrice: cart.totalCartPrice,
      fullName: order.fullName,
      email: order.email,
      phoneNumber: order.phoneNumber,
      address: order.address,
      payment: order.payment,
      status: order.status,
    };

    // Gửi dữ liệu order lên API và cập nhật orderId sau khi thành công
    dispatch(postOrderToAPI(orderData));
  }, [
    dispatch,
    user,
    cart.items,
    cart.totalCartPrice,
    order.fullName,
    order.email,
    order.phoneNumber,
    order.address,
    order.payment,
    order.status,
  ]);

  return (
    <>
      <section>
        <div className="mx-auto grid h-screen w-full md:grid-cols-2">
          <div className="mx-auto w-full p-10 text-sm font-light">
            <h1 className="">
              <Link to="/">
                <img
                  src="https://theme.hstatic.net/200000182297/1000887316/14/logo.png?v=1068"
                  alt=""
                />
              </Link>
            </h1>
            <div className="my-5 h-auto w-full">
              <div className="mt-4 flex justify-between">
                <h2 className="relative text-xl font-normal text-[#333333]">
                  Đặt hàng thành công
                  <span className="block text-sm font-light">
                    Cảm ơn bạn đã mua hàng !
                  </span>
                </h2>
                <FontAwesomeIcon
                  icon={faCheck}
                  className="h-10 w-10 rounded-full border border-[#338dbc] p-2 text-[#338dbc]"
                />
              </div>
            </div>
            <div className="mb-4 grid h-auto w-full gap-2 rounded-md border p-4">
              <p className="my-2 font-normal">Thông tin đơn hàng</p>
              <p>Thông tin vận chuyển</p>
              <p>Tên: {order.fullName}</p>
              <p>Email: {order.email}</p>
              <p>Số điện thoại: {order.phoneNumber}</p>
              <p>Địa chỉ: {order.address}</p>
              <p className="my-2 font-normal">Phương thức thanh toán</p>
              <p>{order.payment}</p>
            </div>
            <div className="grid w-full grid-flow-col">
              <button
                className="h-14 w-full place-self-end rounded bg-[#338dbc] text-white"
                onClick={() => {
                  // Gọi action để xóa dữ liệu giỏ hàng và đặt hàng
                  dispatch(clearCart());
                  dispatch(clearOrder());
                  // Điều hướng lại trang Trang chủ
                  navigate("/");
                }}
              >
                Trở về trang chủ
              </button>
            </div>
          </div>

          <div className="bg-[#f6f5f5]">
            <div className="mx-auto grid h-auto w-full p-10">
              {cart.items.map((item) => (
                <div
                  key={item._id}
                  className="mb-4 grid grid-cols-2 gap-5 xl:grid-cols-4"
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="h-40 w-20 object-cover"
                  />
                  <div className="self-center">
                    <p>{item.name}</p>
                    <p className="text-sm text-gray-400">
                      {`Size ${item.selectedSize} / ${item.colors}`}
                    </p>
                    <p className="text-sm text-gray-400">SL: {item.quantity}</p>
                  </div>
                  <div className="self-center text-end">
                    <p>{formatCurrency(item.price)}</p>
                  </div>
                </div>
              ))}

              <div className="text-xl">
                <hr />
                <span className="">Tổng tiền:</span>
                <span className="float-end">
                  <strong className="mr-2 text-sm font-light">VND</strong>
                  {formatCurrency(cart.totalCartPrice)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
