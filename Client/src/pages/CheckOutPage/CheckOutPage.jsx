import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import useCurrencyFormatter from "../../hooks/useCurrencyFormatter";
import { useDispatch, useSelector } from "react-redux";
import { updateOrderInfo, selectOrder } from "../../features/order/orderSlice";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CheckOutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Định dạng tiền tệ
  const { formatCurrency } = useCurrencyFormatter();

  const cart = useSelector((state) => state.cart);
  const order = useSelector(selectOrder);

  const [formData, setFormData] = useState({
    fullName: order.fullName,
    email: order.email,
    phoneNumber: order.phoneNumber,
    address: order.address,
  });

  const [inputValid, setInputValid] = useState({
    fullName: true,
    email: true,
    phoneNumber: true,
    address: true,
  });

  const validateInputs = () => {
    const newInputValid = {
      fullName: !!formData.fullName.trim(),
      email: !!formData.email.trim(),
      phoneNumber: !!formData.phoneNumber.trim(),
      address: !!formData.address.trim(),
    };

    setInputValid(newInputValid);

    return Object.values(newInputValid).every((valid) => valid);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePaymentButtonClick = (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của nút submit

    const inputsAreValid = validateInputs();

    if (inputsAreValid) {
      // Dispatch the updateOrderInfo action with the updated form data
      dispatch(updateOrderInfo(formData));
      // Add any additional logic for navigating to the next step or page
      navigate("/checkoutpay");
    } else {
      toast.warning("Vui lòng điền đầy đủ thông tin");
    }
  };

  return (
    <>
      <section>
        <div className="grid h-screen w-full grid-cols-2">
          <div className="mx-auto p-[50px] text-sm font-light">
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
                <Link className="cursor-not-allowed text-black">
                  Thông tin vận chuyển
                </Link>
              </li>
              <FontAwesomeIcon icon={faAngleRight} className="mx-2" />
              <li className="inline-block">
                <Link
                  className="cursor-pointer text-[#338dbc] hover:text-[#2b78a0]"
                  onClick={handlePaymentButtonClick}
                >
                  Phương thức thanh toán
                </Link>
              </li>
            </ul>
            <div className="h-[240px] w-[572px]">
              <div className="mb-8 mt-4 h-[18px]">
                <h2 className="text-[20px] font-normal text-[#333333]">
                  Thông tin thanh toán
                </h2>
              </div>
              <div className="mb-3 h-[43px]">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Họ và tên"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`h-[43px] w-[572px] border ${
                    inputValid.fullName
                      ? "border-[#d9d9d9]"
                      : "rounded border-red-500"
                  } p-4 text-[#333333] outline-none`}
                />
              </div>
              <div className="mb-3 grid h-[43px] grid-flow-col">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`h-[43px] w-[377px] border ${
                    inputValid.email
                      ? "border-[#d9d9d9]"
                      : "rounded border-red-500"
                  } p-4 text-[#333333] outline-none`}
                />
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Số điện thoại"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className={`h-[43px] w-[182px] rounded border ${
                    inputValid.phoneNumber
                      ? "border-[#d9d9d9]"
                      : "border-red-500"
                  } place-self-end p-4 text-[#333333] outline-none`}
                />
              </div>
              <div className="mb-3 h-[43px]">
                <input
                  type="text"
                  name="address"
                  placeholder="Địa chỉ"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`h-[43px] w-[572px] rounded border ${
                    inputValid.address ? "border-[#d9d9d9]" : "border-red-500"
                  } p-4 text-[#333333] outline-none`}
                />
              </div>
            </div>
            <div className="grid w-[570px] grid-flow-col">
              <button className="text-start font-normal">
                <Link
                  to="/cart"
                  className="cursor-pointer px-1 text-[#338dbc] hover:text-[#2b78a0]"
                >
                  Giỏ hàng
                </Link>
              </button>
              <button
                className="h-[56px] w-[200px] place-self-end rounded bg-[#338dbc] text-white"
                onClick={handlePaymentButtonClick}
              >
                Phương thức thanh toán
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

              <div className="text-[20px]">
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
