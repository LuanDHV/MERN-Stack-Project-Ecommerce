import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../features/category/categorySlice";
import slugify from "slugify";

export default function Navbar() {
  // Sử dụng useDispatch để gửi các action đến Redux store và useSelector để lấy state từ Redux store
  const dispatch = useDispatch();

  // Lấy danh sách danh mục từ store
  const categories = useSelector((state) => state.categories.items);
  const status = useSelector((state) => state.categories.status);

  // Chuyển đổi một chuỗi văn bản thành định dạng slug (category)
  const convertToSlug = (text) =>
    slugify(text.replace(/Đ/g, "D"), { lower: true });

  // Sử dụng useEffect để gọi action fetchCategories khi status là "idle"
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  return (
    <>
      <ul className="w-[302px] h-[476px]">
        {categories.map((category) => (
          <div
            key={category._id}
            className={`my-[15px] ${
              !category.children || category.children.length === 0
                ? "h-[84px]"
                : ""
            }`}
          >
            <li className="w-[302px]">
              <Link
                to={`/danh-muc/${convertToSlug(category.name)}`}
                className="font-bold"
              >
                {category.name}
              </Link>
              {category.children && category.children.length > 0 && (
                <ul className="text-[#8A8A8F]">
                  {category.children.map(
                    (child) =>
                      child &&
                      child.name && (
                        <li key={child._id}>
                          <Link
                            to={`/danh-muc/${convertToSlug(
                              category.name
                            )}/${convertToSlug(child.name)}`}
                            className="hover:text-[#070707]"
                          >
                            {child.name}
                          </Link>
                        </li>
                      )
                  )}
                </ul>
              )}
            </li>
          </div>
        ))}
      </ul>
    </>
  );
}
