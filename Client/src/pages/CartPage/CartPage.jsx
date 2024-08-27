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
        <div className="mx-auto mt-20 h-12 w-full border-t border-[#EFEFF4]">
          <div className="mx-auto w-5/6 text-base font-light">
            <Link to="/" className="">
              TRANG CHỦ
            </Link>
            <span> / GIỎ HÀNH CỦA BẠN - NEM FASHION</span>
          </div>
        </div>
      </section>

      <section>
        <div className="h-auto w-full p-5">
          <div className="mx-auto h-auto w-full">
            <h1 className="h-14 text-3xl font-bold">GIỎ HÀNG</h1>
            <table className="h-auto w-full">
              <thead>
                <tr className="hidden md:grid md:grid-cols-5">
                  <th className="border-y px-4 py-2 text-start"></th>
                  <th className="border-y px-4 py-2 text-start">SẢN PHẨM</th>
                  <th className="border-y px-4 py-2">GIÁ / SP</th>
                  <th className="border-y px-4 py-2">SỐ LƯỢNG</th>
                  <th className="border-y px-4 py-2">TỔNG</th>
                </tr>
              </thead>
              <tbody className="">
                {cart.totalItems === 0 ? (
                  <tr>
                    <td colSpan="5">
                      Bạn chưa có sản phẩm nào trong giỏ hàng !
                    </td>
                  </tr>
                ) : (
                  cart.items.map((item) => (
                    <tr
                      key={item._id}
                      className="grid items-center justify-items-center text-center md:grid-cols-5"
                    >
                      <td className="h-full w-3/5 px-4 py-2">
                        <Link to={`/san-pham-chi-tiet/${item._id}`}>
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="object-cover"
                          />
                        </Link>
                      </td>
                      <td className="px-4 py-2 text-start">
                        <Link
                          to={`/san-pham-chi-tiet/${item._id}`}
                          className="text-base font-bold"
                        >
                          {item.name}
                        </Link>
                        <p className="text-base font-light">
                          <span>Phiên bản: </span>
                          <span>
                            {`Size ${item.selectedSize} / ${item.colors}`}
                          </span>
                        </p>
                        <button
                          className="mt-2 h-12 w-full rounded-3xl border bg-[#070707] font-bold text-white duration-300 ease-in-out hover:opacity-85"
                          onClick={() => handleRemoveFromCart(item._id)}
                        >
                          XÓA
                        </button>
                      </td>
                      <td className="px-4 py-2 text-base font-bold">
                        {formatCurrency(item.price)}
                      </td>
                      <td className="px-4 py-2 text-base font-bold">
                        <div className="flex items-center justify-center space-x-4">
                          <button
                            className="h-12 w-12 rounded-3xl border duration-300 ease-in-out hover:bg-slate-200"
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity - 1)
                            }
                          >
                            <FontAwesomeIcon icon={faChevronLeft} />
                          </button>
                          <p className="flex h-12 w-12 items-center justify-center rounded-md border text-lg font-semibold">
                            {item.quantity}
                          </p>
                          <button
                            className="h-12 w-12 rounded-3xl border duration-300 ease-in-out hover:bg-slate-200"
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity + 1)
                            }
                          >
                            <FontAwesomeIcon icon={faChevronRight} />
                          </button>
                        </div>
                      </td>
                      <td className="hidden px-4 py-2 text-base font-bold md:block">
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
        <div className="grid h-auto w-full p-5 md:grid-cols-2">
          <div className="w-full p-5">
            <p>Chú thích</p>
            <input type="text" className="w-full border p-10 outline-none" />
          </div>
          <div className="grid w-full grid-rows-2 p-5">
            <p className="flex w-full items-center justify-center gap-5 text-end text-base">
              <p>THÀNH TIỀN:</p>
              <strong className="text-base font-bold">
                {formatCurrency(cart.totalCartPrice)}
              </strong>
            </p>
            <div className="grid w-full grid-cols-2 items-center justify-center gap-5">
              <button className="flex h-10 items-center justify-center rounded-3xl bg-[#070707] p-3 text-white">
                <Link to="/" className="text-base font-bold">
                  MUA THÊM
                </Link>
              </button>
              <button
                className="flex h-10 items-center justify-center rounded-3xl bg-[#070707] p-3 text-base font-bold text-white"
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
