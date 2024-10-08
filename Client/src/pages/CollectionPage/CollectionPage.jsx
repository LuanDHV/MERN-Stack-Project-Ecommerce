import { Link } from "react-router-dom";

export default function CollectionPage() {
  return (
    <>
      <section>
        <div className="mx-auto mt-20 h-12 w-full border-t border-[#EFEFF4]">
          <div className="mx-auto w-5/6 text-sm font-light">
            <Link to="/" className="">
              TRANG CHỦ
            </Link>
            <span> / BỘ SƯU TẬP</span>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto w-5/6">
          <img
            src="https://theme.hstatic.net/200000182297/1000887316/14/banner_section_coll_1.png?v=1068"
            alt=""
            className="rounded-md object-cover"
          />
        </div>
        <div className="mx-auto my-10 flex h-auto w-5/6 gap-5 xl:gap-10">
          <div className="grid w-3/5 gap-2 xl:gap-5">
            <div className="grid grid-cols-2 gap-2 xl:gap-5">
              <div className="">
                <img
                  src="https://product.hstatic.net/200000182297/product/4_20ac203e48fb4464b82ee87b41571b62_1024x1024.jpg"
                  alt=""
                  className="rounded-md object-cover hover:opacity-90"
                />
                <div className="mt-5 text-center">
                  <p className="font-bold text-[#07070780]">
                    ĐẦM TIỆC VAI CAPE
                  </p>
                  <p className="grid font-bold text-[#070707]">
                    1.899.000đ
                    <span className="font-bold text-[#FF3B30] line-through">
                      2.199.000₫
                    </span>
                  </p>
                </div>
              </div>
              <div className="">
                <img
                  src="https://product.hstatic.net/200000182297/product/3_f02eb31f50c3463b954640386db404cd_1024x1024.jpg"
                  alt=""
                  className="rounded-md object-cover hover:opacity-90"
                />
                <div className="mt-5 text-center">
                  <p className="font-bold text-[#07070780]">ĐẦM TIỆC TRỄ VAI</p>
                  <p className="grid font-bold text-[#070707]">
                    1.899.000đ
                    <span className="font-bold text-[#FF3B30] line-through">
                      2.199.000₫
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 xl:gap-5">
              <div className="">
                <img
                  src="https://product.hstatic.net/200000182297/product/2_db50e4abbbe24fa8ad634f028279e51b_1024x1024.jpg"
                  alt=""
                  className="rounded-md object-cover hover:opacity-90"
                />
                <div className="mt-5 text-center">
                  <p className="font-bold text-[#07070780]">
                    ĐẦM TIỆC TRẮNG VAI NƠ
                  </p>
                  <p className="grid font-bold text-[#070707]">
                    1.899.000đ
                    <span className="font-bold text-[#FF3B30] line-through">
                      2.199.000₫
                    </span>
                  </p>
                </div>
              </div>
              <div className="">
                <img
                  src="https://product.hstatic.net/200000182297/product/3_fe057eb4cf8140288675fe69c1836721_1024x1024.jpg"
                  alt=""
                  className="rounded-md object-cover hover:opacity-90"
                />
                <div className="mt-5 text-center">
                  <p className="font-bold text-[#07070780]">ĐẦM GẤM HOA</p>
                  <p className="grid font-bold text-[#070707]">
                    1.899.000đ
                    <span className="font-bold text-[#FF3B30] line-through">
                      2.199.000₫
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 h-auto">
              <h1 className="mb-5 h-auto text-3xl font-extrabold">
                SẮC MÀU NGÀY TẾT
              </h1>
              <p className="mb-5 h-auto text-justify">
                Tết đến - Xuân về luôn là thời điểm thích hợp để phái đẹp lựa
                chọn khoác lên mình những bộ trang phục có màu sắc thật rạng rỡ
                để mang tới may mắn cho năm mới. Và bộ sưu tập &#34;Sắc màu ngày
                Tết&#34; được NEM cho ra mắt với họa tiết và màu sắc vô cùng bắt
                mắt như một món quà dành tặng bạn trong dịp Tết năm nay. Với khả
                năng biến hoá linh hoạt, đáp ứng mọi phong cách, mọi hoàn cảnh,
                dù bạn muốn trở nên quyến rũ với đầm bút chì, nữ tính cùng đầm
                xoè hay thanh lịch pha chút yểu điệu với những họa tiết chi tiết
                cách điệu, “Sắc Màu Ngày Tết” vẫn tự tin đem đến những trang
                phục đẹp nhất cho mọi quý cô.
              </p>
              <button className="mb-5 h-10 w-full rounded border border-black bg-[#f8f8f9] duration-500 ease-in-out hover:bg-[#070707] hover:text-white">
                <p className="font-bold">XEM THÊM</p>
              </button>
            </div>
          </div>
          <div className="flex w-2/5 flex-col gap-10">
            <img
              src="https://theme.hstatic.net/200000182297/1000887316/14/banner_section_coll_2_1.png?v=1068"
              alt=""
              className="rounded-md object-cover"
            />
            <img
              src="https://theme.hstatic.net/200000182297/1000887316/14/banner_section_coll_2_2.png?v=1068"
              alt=""
              className="rounded-md object-cover"
            />
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto w-5/6">
          <img
            src="https://theme.hstatic.net/200000182297/1000887316/14/banner_section_coll_3.png?v=1466"
            alt=""
            className="rounded-md object-cover"
          />
        </div>
        <div className="mx-auto my-10 flex h-auto w-5/6 gap-5 xl:gap-10">
          <div className="flex w-2/5 flex-col gap-10">
            <img
              src="https://theme.hstatic.net/200000182297/1000887316/14/banner_section_coll_4_1.png?v=1068"
              alt=""
              className="mb-[30px] rounded-md"
            />
            <img
              src="https://theme.hstatic.net/200000182297/1000887316/14/banner_section_coll_4_2.png?v=1068"
              alt=""
              className="rounded-md"
            />
          </div>
          <div className="grid w-3/5 gap-2 xl:gap-5">
            <div className="grid grid-cols-2 gap-2 xl:gap-5">
              <div className="">
                <img
                  src="https://product.hstatic.net/200000182297/product/4_00e63d47514642fb861e5ded1ea356aa_1024x1024.jpg"
                  alt=""
                  className="rounded-md object-cover hover:opacity-90"
                />
                <div className="mt-5 text-center">
                  <p className="font-bold text-[#07070780] transition-colors duration-300 ease-in-out hover:text-black">
                    ÁO DÀI IN HOA
                  </p>
                  <p className="grid font-bold text-[#070707]">
                    1.899.000đ
                    <span className="font-bold text-[#FF3B30] line-through">
                      2.199.000₫
                    </span>
                  </p>
                </div>
              </div>
              <div className="">
                <img
                  src="https://product.hstatic.net/200000182297/product/4_d0fc7fb524ab4720acc2ae9a55a1994a_1024x1024.jpg"
                  alt=""
                  className="rounded-md object-cover hover:opacity-90"
                />
                <div className="mt-5 text-center">
                  <p className="font-bold text-[#07070780]">
                    ÁO DÀI THÊU HOA SEN
                  </p>
                  <p className="grid font-bold text-[#070707]">
                    1.899.000đ
                    <span className="font-bold text-[#FF3B30] line-through">
                      2.199.000₫
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 xl:gap-5">
              <div className="">
                <img
                  src="https://product.hstatic.net/200000182297/product/13_1ab099fdcdba4a28b0bb21b2d6510a66_1024x1024.jpg"
                  alt=""
                  className="rounded-md object-cover hover:opacity-90"
                />
                <div className="mt-5 text-center">
                  <p className="font-bold text-[#07070780]">ÁO DÀI ĐÍNH HOA</p>
                  <p className="grid font-bold text-[#070707]">
                    1.899.000đ
                    <span className="font-bold text-[#FF3B30] line-through">
                      2.199.000₫
                    </span>
                  </p>
                </div>
              </div>
              <div className="">
                <img
                  src="https://product.hstatic.net/200000182297/product/5_11d573ff625f4e218d1146c9b6ef2259_1024x1024.jpg"
                  alt=""
                  className="rounded-md object-cover hover:opacity-90"
                />
                <div className="mt-5 text-center">
                  <p className="font-bold text-[#07070780]">
                    ÁO DÀI ĐỎ ĐÍNH HOA NỔI
                  </p>
                  <p className="grid font-bold text-[#070707]">
                    1.899.000đ
                    <span className="font-bold text-[#FF3B30] line-through">
                      2.199.000₫
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 h-auto">
              <h1 className="mb-5 h-auto text-3xl font-extrabold">
                XUÂN THÌ | AO DAI COLLECTION 2024
              </h1>
              <p className="mb-5 h-auto text-justify">
                &#34;Xuân Thì&#34; - cái tên gợi nhắc tới một thời thanh xuân
                rạng rỡ, là quãng thời gian đẹp nhất mà ai cũng muốn quay trở
                lại. Đó cũng là nguồn cảm hứng để NEM chọn &#34;Xuân Thì&#34;
                làm tên cho Bộ Sưu Tập Áo Dài 2024, với mong muốn gửi gắm quãng
                thời gian đẹp đẽ nhất của người phụ nữ vào trong mỗi sản phẩm.
                Hy vọng rằng mỗi quý cô sẽ tìm được lại bản ngã đẹp nhất của
                chính mình và được sống vẹn nguyên những ngày thanh xuân ấy.
                <br />
                Bộ sưu tập gây ấn tượng với khả năng biến tấu linh hoạt với 03
                dòng chất liệu được mệnh danh “Con đường tơ lụa” được sử dụng
                khi may Áo Dài: Nhung, Lụa và Taffeta. Tạo nên sự uyển chuyển và
                vẻ đẹp mỹ miều nhưng đằm thắm khó cưỡng, khoe trọn nét duyên
                dáng, son sắc của người phụ nữ Việt. Bộ sưu tập Áo Dài &#34;Xuân
                Thì&#34; đã có mặt tại toàn bộ store của NEM!
              </p>
              <button className="mb-5 h-10 w-full rounded border border-black bg-[#f8f8f9] duration-500 ease-in-out hover:bg-[#070707] hover:text-white">
                <p className="font-bold">XEM THÊM</p>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
