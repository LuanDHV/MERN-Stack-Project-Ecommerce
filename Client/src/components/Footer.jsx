export default function Footer() {
  return (
    <>
      {/* SUBSCRIBE */}
      <section>
        <div className="w-full h-[334px] mx-auto mt-16 py-[50px] bg-[#EFEFF4]">
          <h2 className="text-center mb-5">
            <a href="" className="text-[32px] font-bold">
              ĐĂNG KÝ BẢN TIN
              <p className="text-sm">
                Đăng ký nhận bản tin NEM để được cập nhật những mẫu thiết kế mới
                nhất
              </p>
            </a>
            <div className=" mx-auto mt-10">
              <input
                type="email"
                placeholder="Vui lòng nhập email..."
                className="w-[455px] h-[44px] px-4 border border-[#C8C7CC] text-[14px] outline-none rounded-l-md"
              />
              <button className="w-[145px] h-[44px] bg-[#070707] text-white rounded-r-md">
                ĐĂNG KÝ
              </button>
            </div>
          </h2>
        </div>
      </section>

      {/* FOOTER */}
      <section>
        <div className="w-full h-[287px] mx-auto py-[50px] bg-[#070707]">
          <div className="w-[1330px] h-[187px] mx-auto pl-[30px] grid grid-flow-col auto-cols-max">
            <div className="w-[502px] h-[187px] grid grid-rows-5 text-white">
              <p className="font-bold">NEM FASHION - THỜI TRANG CÔNG SỞ</p>
              <p className="text-[14px]">
                Công ty TNHH Dịch vụ và Thương mại An Thành. <br />
                Số ĐKKD 0107861393, Sở KHĐT Tp. Hà Nội cấp ngày 04/10/2017
              </p>
              <p className="text-[14px] mt-2">
                Địa chỉ: Lô 1+2, Ô quy hoạch E.2/NO7 đường Lâm Hạ <br />
                phường Bồ Đề, quận Long Biên, Hà Nội
              </p>
              <p className="text-[14px] mt-4">
                Chăm sóc khách hàng: 0246.2591551 <br />
                Mua hàng online: 0246.2909098
              </p>
              <p className="text-[14px] mt-6">Email: nemcskh@stripe-vn.com</p>
            </div>

            <div className="w-[266px] h-[144px] grid grid-rows-5 text-white mt-10 pl-[30px]">
              <p className="text-[14px]">Giới thiệu</p>
              <p className="text-[14px]">Triết lý kinh doanh tại NEM Fashion</p>
              <p className="text-[14px]">NEM&apos;s Blog</p>
              <p className="text-[14px]">Hệ thống showroom</p>
              <p className="text-[14px]">Liên hệ</p>
            </div>

            <div className="w-[266px] h-[144px] grid grid-rows-7 text-white mt-10 pl-[30px]">
              <p className="text-[14px]"> Chính sách giao nhận - Vận chuyển</p>
              <p className="text-[14px]">Hướng dẫn thanh toán</p>
              <p className="text-[14px]">Tra cứu đơn hàng</p>
              <p className="text-[14px]">Hướng dẫn chọn Size</p>
              <p className="text-[14px]">Quy định đổi hàng</p>
              <p className="text-[14px]">Quy định bảo hành và sửa chữa</p>
              <p className="text-[14px]">Khách hàng thân thiết</p>
            </div>

            <div className="w-[266px] h-[144px] grid grid-rows-3 text-white mt-10 pl-[30px]">
              <p className="text-[14px]">Phương thức thanh toán</p>
              <img
                src="https://theme.hstatic.net/200000182297/1000887316/14/image_method_3.png?v=1068"
                alt=""
                className="w-[55px] h-[35px]"
              />
              <img
                src="https://theme.hstatic.net/200000182297/1000887316/14/bct.png?v=1068"
                alt=""
                className="w-[118px] h-[44px]"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
