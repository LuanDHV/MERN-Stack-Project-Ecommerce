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
        <div className="mx-auto mt-24 h-12 w-full border-t border-[#EFEFF4]">
          <div className="mx-auto w-5/6 text-sm font-light">
            <Link to="/" className="">
              TRANG CHỦ
            </Link>
            <span> / GIỎ HÀNH CỦA BẠN - NEM FASHION</span>
          </div>
        </div>
      </section>

      <section>
        <div className="h-auto w-full py-[50px]">
          <div className="mx-auto h-auto w-[1300px]">
            <h1 className="h-[54px] text-3xl font-bold">GIỎ HÀNG</h1>
            <table className="h-[78px] min-w-full">
              <thead>
                <tr className="">
                  <th className="border-y px-4 py-2 text-start"></th>
                  <th className="border-y px-4 py-2 text-start">SẢN PHẨM</th>
                  <th className="border-y px-4 py-2">GÍA / SP</th>
                  <th className="border-y px-4 py-2">SỐ LƯỢNG</th>
                  <th className="border-y px-4 py-2">TỔNG</th>
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
                      <td className="px-4 py-2">
                        <Link to={`/san-pham-chi-tiet/${item._id}`}>
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="h-[240px] w-[160px]"
                          />
                        </Link>
                      </td>
                      <td className="px-4 py-2 text-start">
                        <Link
                          to={`/san-pham-chi-tiet/${item._id}`}
                          className="text-[20px] font-bold"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm font-light">
                          <span>Phiên bản: </span>
                          <span>
                            {`Size ${item.selectedSize} / ${item.colors}`}
                          </span>
                        </p>
                        <button
                          className="mt-2 h-10 w-[250px] rounded border bg-[#070707] font-bold text-white duration-300 ease-in-out hover:opacity-85"
                          onClick={() => handleRemoveFromCart(item._id)}
                        >
                          XÓA
                        </button>
                      </td>
                      <td className="px-4 py-2 text-[20px] font-bold">
                        {formatCurrency(item.price)}
                      </td>
                      <td className="px-4 py-2 text-[20px] font-bold">
                        <div className="flex items-center justify-center space-x-4">
                          <button
                            className="h-8 w-8 rounded border duration-300 ease-in-out hover:bg-slate-200"
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity - 1)
                            }
                          >
                            <FontAwesomeIcon icon={faChevronLeft} />
                          </button>
                          <p className="w-[60px] rounded border text-lg font-semibold">
                            {item.quantity}
                          </p>
                          <button
                            className="h-8 w-8 rounded border duration-300 ease-in-out hover:bg-slate-200"
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity + 1)
                            }
                          >
                            <FontAwesomeIcon icon={faChevronRight} />
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-[20px] font-bold">
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
        <div className="mx-auto my-[50px] h-[0.8px] w-[1300px] border border-[#e7e7e7]">
          <hr className=""></hr>
        </div>
        <div className="mx-auto grid h-[150px] w-full grid-flow-col">
          <div className="h-[150px] w-[886px]">
            <p>Chú thích</p>
            <input
              type="text"
              className="h-[120px] w-[886px] border outline-none"
            />
          </div>
          <div className="grid h-[83px] w-[443px] grid-rows-2 place-content-end">
            <p className="text-end text-sm">
              THÀNH TIỀN:
              <strong className="ml-[10px] text-[20px] font-bold">
                {formatCurrency(cart.totalCartPrice)}
              </strong>
            </p>
            <div className="text-sm font-bold">
              <button className="mr-2 h-[37px] w-[126px] rounded-3xl bg-[#070707] p-[10px] text-white">
                <Link to="/">MUA THÊM</Link>
              </button>
              <button
                className="h-[37px] w-[126px] rounded-3xl bg-[#070707] p-[10px] text-white"
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
