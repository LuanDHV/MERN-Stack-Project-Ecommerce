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
        <div className="w-full h-screen  mx-auto grid grid-cols-2 ">
          <div className="mx-auto p-[50px] text-[14px] font-light">
            <h1 className="pt-10">
              <Link to="/">
                <img
                  src="https://theme.hstatic.net/200000182297/1000887316/14/logo.png?v=1068"
                  alt=""
                />
              </Link>
            </h1>
            <div className="w-[572px] h-[100px]">
              <div className="h-[18px] mt-4">
                <h2 className="text-[#333333] text-[20px] font-normal relative">
                  Đặt hàng thành công
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="w-12 p-2 h-12 ml-4 mt-1 absolute border rounded-full border-[#338dbc] text-[#338dbc]"
                  />
                </h2>
                <span className="block">Cảm ơn bạn đã mua hàng !</span>
              </div>
            </div>
            <div className="w-[570px] h-[270px] border rounded-md mb-4 p-4">
              <p className="font-normal text-[16px] my-2">Thông tin đơn hàng</p>
              <p>Thông tin vận chuyển</p>
              <p>Tên: {order.fullName}</p>
              <p>Email: {order.email}</p>
              <p>Số điện thoại: {order.phoneNumber}</p>
              <p>Địa chỉ: {order.address}</p>
              <p className="font-normal text-[16px] my-2">
                Phương thức thanh toán
              </p>
              <p>{order.payment}</p>
            </div>
            <div className="grid grid-flow-col w-[570px]">
              <button
                className="w-[200px] h-[56px] bg-[#338dbc] text-white place-self-end rounded"
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
            <div className="w-[500px] h-auto p-[50px] mx-auto grid grid-rows-2 float-left">
              {cart.items.map((item) => (
                <div key={item._id} className="grid grid-cols-3 mb-4">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-[64px] h-[100px] object-cover"
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

              <div className="text-[20px]">
                <hr />
                <span className="">Tổng tiền:</span>
                <span className="float-end">
                  <strong className="text-[14px] font-light mr-2">VND</strong>
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
