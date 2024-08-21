export default function Footer() {
  return (
    <>
      {/* SUBSCRIBE */}
      <section>
        <div className="mx-auto mt-20 h-auto w-full bg-[#EFEFF4] py-14 font-bold">
          <div className="mx-auto w-5/6 p-5 text-center">
            <a href="" className="text-3xl">
              ĐĂNG KÝ BẢN TIN
              <p className="text-sm">
                Đăng ký nhận bản tin NEM để được cập nhật những mẫu thiết kế mới
                nhất
              </p>
            </a>
            <div className="mx-auto mt-10 w-full">
              <input
                type="email"
                placeholder="Nhập email..."
                className="h-10 w-1/2 rounded-l-md border border-[#C8C7CC] px-4 outline-none"
              />
              <button className="h-10 rounded-r-md bg-[#070707] px-5 text-white">
                ĐĂNG KÝ
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <section>
        <div className="grid w-full grid-cols-2 items-center justify-items-center gap-10 bg-[#070707] p-10 md:grid-cols-4 md:p-14">
          <div className="grid grid-flow-row text-sm text-white">
            <p className="mb-5 text-base font-bold">
              NEM FASHION - THỜI TRANG CÔNG SỞ
            </p>
            <p className="">
              Công ty TNHH Dịch vụ và Thương mại An Thành. <br />
              Số ĐKKD 0107861393, Sở KHĐT Tp. Hà Nội cấp ngày 04/10/2017
            </p>
            <p className="">
              Địa chỉ: Lô 1+2, Ô quy hoạch E.2/NO7 đường Lâm Hạ <br />
              phường Bồ Đề, quận Long Biên, Hà Nội
            </p>
            <p className="">
              Chăm sóc khách hàng: 0246.2591551 <br />
              Mua hàng online: 0246.2909098
            </p>
            <p className="">Email: nemcskh@stripe-vn.com</p>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
            <div className=""></div>
          </div>
          <div className="grid grid-flow-row text-sm text-white">
            <p className="">Giới thiệu</p>
            <p className="">Triết lý kinh doanh tại NEM Fashion</p>
            <p className="">NEM&apos;s Blog</p>
            <p className="">Hệ thống showroom</p>
            <p className="">Liên hệ</p>
          </div>
          <div className="grid grid-flow-row text-sm text-white">
            <p className=""> Chính sách giao nhận - Vận chuyển</p>
            <p className="">Hướng dẫn thanh toán</p>
            <p className="">Tra cứu đơn hàng</p>
            <p className="">Hướng dẫn chọn Size</p>
            <p className="">Quy định đổi hàng</p>
            <p className="">Quy định bảo hành và sửa chữa</p>
            <p className="">Khách hàng thân thiết</p>
          </div>
          <div className="grid grid-flow-row text-sm text-white">
            <p className="">Phương thức thanh toán</p>
            <img
              src="https://theme.hstatic.net/200000182297/1000887316/14/image_method_3.png?v=1068"
              alt=""
              className="w-16 object-cover"
            />
            <img
              src="https://theme.hstatic.net/200000182297/1000887316/14/bct.png?v=1068"
              alt=""
              className="w-32 object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
