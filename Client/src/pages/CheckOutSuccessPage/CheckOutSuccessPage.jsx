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
        <div className="mx-auto grid h-screen w-full grid-cols-2">
          <div className="mx-auto p-[50px] text-sm font-light">
            <h1 className="pt-10">
              <Link to="/">
                <img
                  src="https://theme.hstatic.net/200000182297/1000887316/14/logo.png?v=1068"
                  alt=""
                />
              </Link>
            </h1>
            <div className="h-[100px] w-[572px]">
              <div className="mt-4 h-[18px]">
                <h2 className="relative text-xl font-normal text-[#333333]">
                  Đặt hàng thành công
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="absolute ml-4 mt-1 h-12 w-12 rounded-full border border-[#338dbc] p-2 text-[#338dbc]"
                  />
                </h2>
                <span className="block">Cảm ơn bạn đã mua hàng !</span>
              </div>
            </div>
            <div className="mb-4 h-[270px] w-[570px] rounded-md border p-4">
              <p className="my-2 text-[16px] font-normal">Thông tin đơn hàng</p>
              <p>Thông tin vận chuyển</p>
              <p>Tên: {order.fullName}</p>
              <p>Email: {order.email}</p>
              <p>Số điện thoại: {order.phoneNumber}</p>
              <p>Địa chỉ: {order.address}</p>
              <p className="my-2 text-[16px] font-normal">
                Phương thức thanh toán
              </p>
              <p>{order.payment}</p>
            </div>
            <div className="grid w-[570px] grid-flow-col">
              <button
                className="h-[56px] w-[200px] place-self-end rounded bg-[#338dbc] text-white"
                onClick={() => {
                  // Gọi action để xóa dữ liệu giỏ hàng và đặt hàng
                  dispatch(clearCart());
                  dispatch(clearOrder());
                  // Điều hướng lại trang "Tiếp tục mua hàng"
                  navigate("/");
                }}
              >
                Tiếp tục mua hàng
              </button>
            </div>
          </div>

          <div className="bg-[#f6f5f5]">
            <div className="float-left mx-auto grid h-auto w-full grid-rows-2 p-[50px]">
              {cart.items.map((item) => (
                <div key={item._id} className="mb-4 grid grid-cols-3">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="h-[100px] w-[64px] object-cover"
                  />
                  <div className="self-center">
                    <p>{item.name}</p>
                    <p className="text-[12px] text-gray-400">
                      {`Size ${item.selectedSize} / ${item.colors}`}
                    </p>
                    <p className="text-[12px] text-gray-400">
                      SL: {item.quantity}
                    </p>
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
