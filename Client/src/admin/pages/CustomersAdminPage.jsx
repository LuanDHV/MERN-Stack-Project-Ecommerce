import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderAdmin from "../components/HeaderAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import {
  fetchUsers,
  updateUser,
  deleteUser,
} from "../../features/user/userSlice";

export default function CustomersAdminPage() {
  // Sử dụng useDispatch để gửi các action đến Redux store và useSelector để lấy state từ Redux store
  const dispatch = useDispatch();

  const [isNavbarVisible, setNavbarVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Lấy danh sách người dùng từ store, lọc chỉ lấy người dùng có vai trò là "user"
  const users = useSelector((state) =>
    state.user.users.filter((user) => user.role === "user"),
  );

  // Thêm state để theo dõi trang hiện tại
  const [currentPage, setCurrentPage] = useState(1);

  // Số người dùng mỗi trang
  const usersPerPage = 10;

  // Tính toán số trang
  const totalPages = Math.ceil(users.length / usersPerPage);

  // Tính toán người dùng hiển thị trên trang hiện tại
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const displayedUsers = users.slice(startIndex, endIndex);

  // Hàm chuyển trang
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Hàm rút ngắn độ dài ID
  const shortenId = (id) => id.slice(0, 8);

  // Update
  // Hàm xử lý khi người dùng nhấn vào button cập nhật vai trò
  const handleUpdateButtonClick = (user) => {
    // Nếu dropdown đã được mở ra từ button đó, thì đóng dropdown
    if (showDropdown === user._id) {
      setShowDropdown(null);
    } else {
      setSelectedUser(user);
      setShowDropdown(user._id);
    }
  };

  // Khi người dùng chọn một vai trò từ dropdown, bạn cần cập nhật vai trò cho người dùng
  const handleRoleUpdate = (user, role) => {
    // Cập nhật vai trò của người dùng ở đây, ví dụ:
    toast.success("Cập nhật vai trò thành công");
    // Gửi action đến Redux store để cập nhật vai trò đơn hàng
    dispatch(updateUser({ _id: user._id, role }))
      .then(() => {
        dispatch(fetchUsers());
      })
      .catch((error) => {
        console.error("Error updating user role:", error);
        // Xử lý lỗi khi cập nhật vai trò
        toast.error("Đã có lỗi xảy ra khi cập nhật vai trò!");
      });

    // Sau khi cập nhật, bạn có thể ẩn dropdown
    setShowDropdown(null);
  };

  // Delete
  const handleDeleteButtonClick = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      // Gửi request API để xóa khách hàng
      dispatch(deleteUser(selectedUser._id));
      setShowDeleteModal(false); // Đóng modal sau khi xóa thành công
      toast.success("Xóa khách hàng thành công");
      // dispatch(fetchUsers());
    } catch (error) {
      console.error("Lỗi khi xóa khách hàng:", error);
      // Xử lý lỗi khi xóa khách hàng
      toast.error("Đã có lỗi xảy ra khi xóa khách hàng!");
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false); // Đóng modal khi người dùng hủy bỏ xóa khách hàng
  };

  // Sử dụng useEffect để gọi action fetchUsers
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <>
      <HeaderAdmin
        isNavbarVisible={isNavbarVisible}
        toggleNavbar={setNavbarVisible}
      />
      <div
        className={`${
          isNavbarVisible ? "ml-auto w-5/6" : "w-full"
        } h-auto overflow-hidden bg-slate-50 px-5 pt-20`}
      >
        <h1 className="py-5 text-lg font-bold text-[#474151]">
          Danh Sách Khách hàng
        </h1>
        <div className="my-5 h-auto w-full rounded-md border bg-white px-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="mt-4 grid grid-cols-6 place-items-center rounded-md border bg-slate-50 p-2">
                <th>ID KHÁCH HÀNG</th>
                <th>THỜI GIAN THAM GIA</th>
                <th>TÊN KHÁCH HÀNG</th>
                <th>EMAIL</th>
                <th>VAI TRÒ</th>
                <th>HÀNH ĐỘNG</th>
              </tr>
            </thead>
            <thead>
              {displayedUsers.map((user) => (
                <tr
                  key={user._id}
                  className="mt-4 grid grid-cols-6 place-items-center p-2"
                >
                  <th>{shortenId(user._id.toUpperCase())}</th>
                  <th>
                    {`${new Intl.DateTimeFormat("vi-VN", {
                      hour: "numeric",
                      minute: "numeric",
                    }).format(
                      new Date(user.createdAt),
                    )} ${new Intl.DateTimeFormat("vi-VN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }).format(new Date(user.createdAt))}`}
                  </th>
                  <th>{user.username}</th>
                  <th>{user.email}</th>
                  <th>
                    <div className="relative">
                      <button
                        className={`w-[200px] rounded-md p-2 duration-300 ease-in-out hover:bg-gray-300 ${
                          user.role === "admin"
                            ? "bg-[#FEE2E2] text-[#FF4444]"
                            : user.role === "user"
                              ? "bg-[#D1FAE5] text-[#059669]"
                              : ""
                        }`}
                        onClick={() => handleUpdateButtonClick(user)}
                      >
                        {user.role}
                      </button>
                      {showDropdown === user._id && (
                        <ul className="absolute right-0 top-10 z-10 w-full rounded-md bg-white shadow-lg">
                          <li>
                            <button
                              className="block w-full px-4 py-2 text-gray-800 duration-300 ease-in-out hover:bg-gray-200"
                              onClick={() => handleRoleUpdate(user, "admin")}
                            >
                              admin
                            </button>
                          </li>
                        </ul>
                      )}
                    </div>
                  </th>
                  <th>
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className="h-4 w-4 cursor-pointer p-4 duration-300 ease-in-out hover:text-red-500"
                      onClick={() => handleDeleteButtonClick(user)}
                    />
                  </th>
                </tr>
              ))}
            </thead>
          </table>
          <div className="float-end cursor-pointer p-4 leading-[50px]">
            {/* Tạo các nút chuyển trang */}
            {Array.from({ length: totalPages }).map((_, index) => (
              <p
                key={index}
                className={`inline-block h-10 w-10 rounded-md text-center ${
                  currentPage === index + 1
                    ? "mr-2 bg-[#10B981] text-white duration-300 ease-out hover:bg-[#059669]"
                    : "mr-2 bg-[#F3F4F6] text-black duration-300 ease-out hover:bg-[#F3F4F6]"
                } `}
                onClick={() => handlePageChange(index + 1)}
              >
                {/* Hiển thị số trang*/}
                {index + 1}
              </p>
            ))}
          </div>
        </div>
      </div>
      {/* Delete Modal */}
      {showDeleteModal && selectedUser && (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="rounded-lg bg-white p-6">
            <div className="text-center">
              <FontAwesomeIcon
                icon={faTrashCan}
                className="h-10 w-10 cursor-pointer p-5 text-red-500 duration-300 ease-in-out"
              />
            </div>
            <p className="mb-4 text-xl font-bold">
              Bạn có chắc muốn xóa người dùng
              <span className="ml-1 text-red-500">
                {shortenId(selectedUser._id.toUpperCase())}
              </span>
              ?
            </p>
            <p className="mb-4">
              Người dùng này sẽ không còn tồn tại trong danh sách nếu như bạn
              xác nhận xóa !
            </p>

            <div className="flex justify-end">
              <button
                className="mr-4 rounded-md bg-gray-400 px-4 py-2 text-white duration-300 ease-in-out hover:bg-gray-500"
                onClick={handleCancelDelete}
              >
                Hủy bỏ
              </button>
              <button
                className="rounded-md bg-red-500 px-4 py-2 text-white duration-300 ease-in-out hover:bg-red-700"
                onClick={handleConfirmDelete}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
