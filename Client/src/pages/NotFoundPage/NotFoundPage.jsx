import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <>
      <section>
        <div className="mx-auto mt-24 h-12 w-full border-t border-[#EFEFF4]">
          <div className="mx-auto w-5/6 text-sm font-light">
            <Link to="/" className="">
              TRANG CHỦ
            </Link>
            <span> / KHÔNG TÌM THẤY TRANG</span>
          </div>
        </div>
      </section>
      <section>
        <div className="h-auto w-full py-[50px]">
          <div className="mx-auto h-auto w-5/6">
            <h1 className="mx-auto h-auto text-center text-2xl font-bold">
              TRANG BẠN YÊU CẦU KHÔNG CÓ !
            </h1>
            <p className="mt-4 text-center text-sm">
              Bạn có thể làm theo các hướng dẫn sau:
              <br />
              - Sử dụng thanh tìm kiếm ở đầu trang để tìm kiếm sản phẩm.
              <br />- Hoặc click vào các danh mục dưới đây để tìm sản phẩm dễ
              dàng hơn.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
