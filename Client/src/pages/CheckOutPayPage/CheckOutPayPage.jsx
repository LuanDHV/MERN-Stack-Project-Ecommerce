import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import useCurrencyFormatter from "../../hooks/useCurrencyFormatter";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { updateOrderInfo } from "../../features/order/orderSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CheckOutPayPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const order = useSelector((state) => state.order); // Lấy trạng thái order từ Redux
  // Định dạng tiền tệ
  const { formatCurrency } = useCurrencyFormatter();

  // Trạng thái để theo dõi phương thức thanh toán được chọn
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  // Cập nhật formData khi có thay đổi trong trạng thái Redux
  useEffect(() => {
    setSelectedPaymentMethod(order.payment);
  }, [order]);

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const handlePaymentButtonClick = (e) => {
    e.preventDefault();

    if (!selectedPaymentMethod) {
      toast.warning("Vui lòng chọn phương thức thanh toán trước khi tiếp tục.");
      return;
    }

    dispatch(
      updateOrderInfo({
        fullName: order.fullName,
        email: order.email,
        phoneNumber: order.phoneNumber,
        address: order.address,
        payment: selectedPaymentMethod,
      }),
    );

    navigate("/checkoutsuccess");
    toast.success("Đặt hàng thành công. Hãy kiểm tra email của bạn");
  };

  return (
    <>
      <section>
        <div className="mx-auto grid h-screen w-full md:grid-cols-2">
          <div className="mx-auto w-full p-10 text-sm font-light">
            <h1 className="pb-10">
              <Link to="/">
                <img
                  src="https://theme.hstatic.net/200000182297/1000887316/14/logo.png?v=1068"
                  alt=""
                />
              </Link>
            </h1>
            <ul className="inline font-normal">
              <li className="inline-block">
                <Link
                  to="/cart"
                  className="cursor-pointer text-[#338dbc] hover:text-[#2b78a0]"
                >
                  Giỏ hàng
                </Link>
              </li>
              <FontAwesomeIcon icon={faAngleRight} className="mx-2" />
              <li className="inline-block">
                <Link
                  to="/checkout"
                  className="cursor-pointer text-[#338dbc] hover:text-[#2b78a0]"
                >
                  Thông tin vận chuyển
                </Link>
              </li>
              <FontAwesomeIcon icon={faAngleRight} className="mx-2" />
              <li className="inline-block">
                <Link className="cursor-not-allowed text-black">
                  Phương thức thanh toán
                </Link>
              </li>
            </ul>
            <div className="h-[120px] w-full font-normal">
              <div className="mb-8 mt-4">
                <h2 className="text-xl text-[#333333]">
                  Phương thức vận chuyển
                </h2>
              </div>
              <div className="mb-5 h-10">
                <label className="flex cursor-pointer items-center space-x-2">
                  <span className="flex w-full border border-[#d9d9d9] p-4 text-[#333333]">
                    <input
                      type="radio"
                      defaultChecked
                      className="form-checkbox mr-2 rounded border border-[#d9d9d9] p-4 text-[#333333]"
                    />
                    <p className="flex w-full justify-between">
                      Giao hàng tận nơi (phí vận chuyển tạm tính)
                      <span className="">30,000₫</span>
                    </p>
                  </span>
                </label>
              </div>
            </div>
            <div className="h-auto w-full font-normal">
              <div className="mb-8 mt-4">
                <h2 className="text-xl text-[#333333]">
                  Phương thức thanh toán
                </h2>
              </div>
              <div className="mb-5 h-10">
                <label className="flex cursor-pointer items-center space-x-2">
                  <span className="w-full border border-[#d9d9d9] p-4 text-[#333333]">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Thanh toán tiền mặt khi nhận hàng"
                      className="form-radio mr-2 rounded border border-[#d9d9d9] p-4 text-[#333333]"
                      onChange={handlePaymentMethodChange}
                    />
                    Thanh toán tiền mặt khi nhận hàng
                  </span>
                </label>
              </div>
            </div>

            <div className="grid w-full grid-flow-col">
              <button className="text-start font-normal">
                <Link
                  to="/cart"
                  className="cursor-pointer text-[#338dbc] hover:text-[#2b78a0]"
                >
                  Giỏ hàng
                </Link>
              </button>
              <button
                className="h-14 w-full place-self-end rounded bg-[#338dbc] text-white"
                onClick={handlePaymentButtonClick}
              >
                Đặt hàng
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
