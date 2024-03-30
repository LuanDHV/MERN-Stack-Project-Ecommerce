import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <>
      <section>
        <div className="w-full h-[49px] mx-auto mt-[92px] border-t border-[#EFEFF4]">
          <div className="text-[14px] leading-[49px] font-light px-[60px] ">
            <Link to="/" className="ml-[60px]">
              TRANG CHỦ
            </Link>
            <span> / KHÔNG TÌM THẤY TRANG</span>
          </div>
        </div>
      </section>
      <section>
        <div className="w-full h-[250px] py-[50px]">
          <div className="w-[1360px] h-[110px] px-[30px] mx-auto">
            <h1 className="w-[1360px] h-[30px] text-[24px] font-bold mx-auto">
              TRANG BẠN YÊU CẦU KHÔNG CÓ !
            </h1>
            <p className="mt-4 text-[14px]">
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
