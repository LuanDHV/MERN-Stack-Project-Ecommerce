import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useCurrencyFormatter from "../../hooks/useCurrencyFormatter";
import { removeFromCart } from "../../features/cart/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { updateCartItemQuantity } from "../../features/cart/cartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  // Định dạng tiền tệ
  const { formatCurrency } = useCurrencyFormatter();

  const handleRemoveFromCart = (itemID) => {
    // Gọi hàm này khi click vào nút "XÓA"
    dispatch(removeFromCart(itemID));
    toast.success("Xóa sản phẩm thành công");
  };

  const handleCheckout = () => {
    // Kiểm tra nếu giỏ hàng trống
    if (cart.items.length === 0) {
      toast.warning("Vui lòng thêm sản phẩm");
      // Ngăn chặn chuyển hướng tới trang thanh toán
      return;
    }

    // Thực hiện logic thanh toán nếu giỏ hàng có sản phẩm
    navigate("/checkout");
  };

  const handleQuantityChange = (itemID, newQuantity) => {
    // Gọi action để cập nhật số lượng sản phẩm trong giỏ hàng
    dispatch(updateCartItemQuantity({ itemID, newQuantity }));
    toast.success("Cập nhật số lượng thành công");
  };

  return (
    <>
      <section>
        <div className="w-full h-[49px] mx-auto mt-[92px] border-t border-[#EFEFF4]">
          <div className="text-[14px] leading-[49px] font-light px-[60px] ">
            <Link to="/" className="ml-[60px]">
              TRANG CHỦ
            </Link>
            <span> / GIỎ HÀNH CỦA BẠN - NEM FASHION</span>
          </div>
        </div>
      </section>

      <section>
        <div className="w-full h-auto py-[50px]">
          <div className="w-[1300px] h-auto mx-auto">
            <h1 className="h-[54px] text-[32px] font-bold">GIỎ HÀNG</h1>
            <table className="min-w-full h-[78px]">
              <thead>
                <tr className="">
                  <th className="py-2 px-4 border-y text-start"></th>
                  <th className="py-2 px-4 border-y text-start">SẢN PHẨM</th>
                  <th className="py-2 px-4 border-y">GÍA / SP</th>
                  <th className="py-2 px-4 border-y">SỐ LƯỢNG</th>
                  <th className="py-2 px-4 border-y">TỔNG</th>
                </tr>
              </thead>
              <tbody>
                {cart.totalItems === 0 ? (
                  <tr>
                    <td colSpan="5">
                      Bạn chưa có sản phẩm nào trong giỏ hàng !
                    </td>
                  </tr>
                ) : (
                  cart.items.map((item) => (
                    <tr key={item._id} className="text-center">
                      <td className="py-2 px-4">
                        <Link to={`/san-pham-chi-tiet/${item._id}`}>
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-[160px] h-[240px]"
                          />
                        </Link>
                      </td>
                      <td className="py-2 px-4 text-start ">
                        <Link
                          to={`/san-pham-chi-tiet/${item._id}`}
                          className="text-[20px] font-bold"
                        >
                          {item.name}
                        </Link>
                        <p className="text-[14px] font-light">
                          <span>Phiên bản: </span>
                          <span>
                            {`Size ${item.selectedSize} / ${item.colors}`}
                          </span>
                        </p>
                        <button
                          className="w-[250px] h-[40px] border mt-2 bg-[#070707] text-white hover:opacity-85 duration-300 ease-in-out rounded font-bold"
                          onClick={() => handleRemoveFromCart(item._id)}
                        >
                          XÓA
                        </button>
                      </td>
                      <td className="py-2 px-4 text-[20px] font-bold">
                        {formatCurrency(item.price)}
                      </td>
                      <td className="py-2 px-4 text-[20px] font-bold">
                        <div className="flex items-center justify-center space-x-4">
                          <button
                            className="w-8 h-8 border hover:bg-slate-200 duration-300 ease-in-out rounded"
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity - 1)
                            }
                          >
                            <FontAwesomeIcon icon={faChevronLeft} />
                          </button>
                          <p className="text-lg font-semibold border w-[60px] rounded">
                            {item.quantity}
                          </p>
                          <button
                            className="w-8 h-8 border hover:bg-slate-200 duration-300 ease-in-out rounded"
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity + 1)
                            }
                          >
                            <FontAwesomeIcon icon={faChevronRight} />
                          </button>
                        </div>
                      </td>
                      <td className="py-2 px-4 text-[20px] font-bold">
                        {formatCurrency(item.totalPrice)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section>
        <div className="w-[1300px] h-[0.8px] my-[50px] mx-auto border border-[#e7e7e7]">
          <hr className=""></hr>
        </div>
        <div className="w-[1330px] h-[150px] mx-auto grid grid-flow-col">
          <div className="w-[886px] h-[150px]">
            <p>Chú thích</p>
            <input
              type="text"
              className="w-[886px] h-[120px] border outline-none"
            />
          </div>
          <div className="w-[443px] h-[83px] grid grid-rows-2 place-content-end">
            <p className="text-end text-[14px]">
              THÀNH TIỀN:
              <strong className="font-bold text-[20px]  ml-[10px]">
                {formatCurrency(cart.totalCartPrice)}
              </strong>
            </p>
            <div className="text-[14px] font-bold">
              <button className="w-[126px] h-[37px] p-[10px] bg-[#070707] text-white rounded-3xl mr-2">
                <Link to="/">MUA THÊM</Link>
              </button>
              <button
                className="w-[126px] h-[37px] p-[10px] bg-[#070707] text-white rounded-3xl"
                onClick={handleCheckout}
              >
                THANH TOÁN
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
