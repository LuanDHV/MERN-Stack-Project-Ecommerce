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
        <div className="grid h-screen w-full md:grid-cols-2">
          <div className="mx-auto h-auto w-full p-10 text-sm font-light">
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
            <div className="h-[240px] w-full">
              <div className="mb-8 mt-4">
                <h2 className="text-xl font-normal text-[#333333]">
                  Thông tin thanh toán
                </h2>
              </div>
              <div className="mb-3 h-10">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Họ và tên"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`h-10 w-full border ${
                    inputValid.fullName
                      ? "border-[#d9d9d9]"
                      : "rounded border-red-500"
                  } p-4 text-[#333333] outline-none`}
                />
              </div>
              <div className="mb-3 grid h-10 grid-flow-col">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`h-10 w-full border ${
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
                  className={`h-10 w-full rounded border ${
                    inputValid.phoneNumber
                      ? "border-[#d9d9d9]"
                      : "border-red-500"
                  } place-self-end p-4 text-[#333333] outline-none`}
                />
              </div>
              <div className="mb-3 h-10">
                <input
                  type="text"
                  name="address"
                  placeholder="Địa chỉ"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`h-10 w-full rounded border ${
                    inputValid.address ? "border-[#d9d9d9]" : "border-red-500"
                  } p-4 text-[#333333] outline-none`}
                />
              </div>
            </div>
            <div className="grid w-full grid-flow-col">
              <button className="text-start font-normal">
                <Link
                  to="/cart"
                  className="cursor-pointer px-1 text-[#338dbc] hover:text-[#2b78a0]"
                >
                  Giỏ hàng
                </Link>
              </button>
              <button
                className="h-14 w-full place-self-end rounded bg-[#338dbc] text-white"
                onClick={handlePaymentButtonClick}
              >
                Phương thức thanh toán
              </button>
            </div>
          </div>

          <div className="bg-[#f6f5f5]">
            <div className="mx-auto grid h-auto w-full p-10">
              {cart.items.map((item) => (
                <div key={item._id} className="mb-4 grid grid-cols-3">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="h-40 w-20 object-cover"
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
