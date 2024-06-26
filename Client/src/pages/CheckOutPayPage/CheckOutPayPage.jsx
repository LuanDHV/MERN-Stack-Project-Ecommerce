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
      })
    );

    navigate("/checkoutsuccess");
    toast.success("Đặt hàng thành công. Hãy kiểm tra email của bạn");
  };

  return (
    <>
      <section>
        <div className="w-full h-screen mx-auto grid grid-cols-2 ">
          <div className="mx-auto p-[50px] text-[14px] font-light">
            <h1 className="py-10">
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
                <Link className="cursor-not-allowed text-black ">
                  Phương thức thanh toán
                </Link>
              </li>
            </ul>
            <div className="w-[572px] h-[120px] font-normal">
              <div className="h-[18px] mt-4 mb-8">
                <h2 className="text-[#333333] text-[20px]">
                  Phương thức vận chuyển
                </h2>
              </div>
              <div className="h-[45px] mb-5">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <span className="w-[572px] border border-[#d9d9d9] text-[#333333] p-4">
                    <input
                      type="radio"
                      defaultChecked
                      className="form-checkbox text-[#333333] border border-[#d9d9d9] p-4 mr-2 rounded"
                    />
                    Giao hàng tận nơi (phí vận chuyển tạm tính)
                    <span className="float-end">30,000₫</span>
                  </span>
                </label>
              </div>
            </div>
            <div className="w-[572px] h-[250px] font-normal">
              <div className="h-[18px] mt-4 mb-8">
                <h2 className="text-[#333333] text-[20px]">
                  Phương thức thanh toán
                </h2>
              </div>
              <div className="h-[45px] mb-5">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <span className="w-[572px] border border-[#d9d9d9] text-[#333333] p-4">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Thanh toán tiền mặt khi nhận hàng"
                      className="form-radio text-[#333333] border border-[#d9d9d9] p-4 mr-2 rounded"
                      onChange={handlePaymentMethodChange}
                    />
                    Thanh toán tiền mặt khi nhận hàng
                  </span>
                </label>
              </div>
              {/* <div className="h-[45px] mb-5">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <span className="w-[572px] border border-[#d9d9d9] text-[#333333] p-4">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Thanh toán chuyển khoản ngân hàng"
                      className="form-radio text-[#333333] border border-[#d9d9d9] p-4 mr-2 rounded"
                      onChange={handlePaymentMethodChange}
                    />
                    Thanh toán chuyển khoản ngân hàng
                  </span>
                </label>
              </div> */}
              {/* <div className="h-[45px] mb-5">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <span className="w-[572px] border border-[#d9d9d9] text-[#333333] p-4">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Thanh toán ví MoMo"
                      className="form-radio text-[#333333] border border-[#d9d9d9] p-4 mr-2 rounded"
                      onChange={handlePaymentMethodChange}
                    />
                    Thanh toán ví MoMo
                  </span>
                </label>
              </div> */}
            </div>

            <div className="grid grid-flow-col w-[570px]">
              <button className="text-start font-normal">
                <Link
                  to="/cart"
                  className="cursor-pointer text-[#338dbc] hover:text-[#2b78a0]"
                >
                  Giỏ hàng
                </Link>
              </button>
              <button
                className="w-[200px] h-[56px] bg-[#338dbc] text-white place-self-end rounded"
                onClick={handlePaymentButtonClick}
              >
                Đặt hàng
              </button>
            </div>
          </div>

          <div className="bg-[#f6f5f5]">
            <div className="w-[500px] h-auto mx-auto grid grid-rows-2 p-[50px] float-left">
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
