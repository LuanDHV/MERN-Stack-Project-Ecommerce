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

export default function AdminAccountsPage() {
  // Sử dụng useDispatch để gửi các action đến Redux store và useSelector để lấy state từ Redux store
  const dispatch = useDispatch();

  const [isNavbarVisible, setNavbarVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Lấy danh sách người dùng từ store, lọc chỉ lấy người dùng có vai trò là "admin"
  const users = useSelector((state) =>
    state.user.users.filter((user) => user.role === "admin")
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
        dispatch(fetchUsers()); // Gọi fetchUsers để cập nhật danh sách người dùng
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
      dispatch(fetchUsers());
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
          isNavbarVisible ? "w-[85%] px-[5%]" : "w-full px-[10%]"
        } h-auto float-end  pt-20 `}
      >
        <h1 className="py-5 font-bold text-[18px] text-[#474151]">
          Danh Sách Quản Trị Viên
        </h1>
        <div className="w-full h-auto rounded-md border px-4 my-5 bg-white">
          <table className="w-full text-[14px]">
            <thead>
              <tr className="grid grid-cols-6 mt-4 border p-2 place-items-center rounded-md bg-slate-50">
                <th>ID QUẢN TRỊ VIÊN</th>
                <th>THỜI GIAN THAM GIA</th>
                <th>TÊN QUẢN TRỊ VIÊN</th>
                <th>EMAIL</th>
                <th>VAI TRÒ</th>
                <th>HÀNH ĐỘNG</th>
              </tr>
            </thead>
            <thead>
              {displayedUsers.map((user) => (
                <tr
                  key={user._id}
                  className="grid grid-cols-6 mt-4 p-2 place-items-center "
                >
                  <th>{shortenId(user._id.toUpperCase())}</th>
                  <th>
                    {`${new Intl.DateTimeFormat("vi-VN", {
                      hour: "numeric",
                      minute: "numeric",
                    }).format(
                      new Date(user.createdAt)
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
                        className={`w-[200px] p-2 rounded-md hover:bg-gray-300 duration-300 ease-in-out ${
                          user.role === "admin"
                            ? "text-[#FF4444] bg-[#FEE2E2]"
                            : user.role === "user"
                            ? "text-[#059669] bg-[#D1FAE5]"
                            : ""
                        }`}
                        onClick={() => handleUpdateButtonClick(user)}
                      >
                        {user.role}
                      </button>
                      {showDropdown === user._id && (
                        <ul className="absolute bg-white rounded-md shadow-lg top-10 right-0 z-10 w-full">
                          <li>
                            <button
                              className="block px-4 py-2 text-gray-800 hover:bg-gray-200 duration-300 ease-in-out w-full"
                              onClick={() => handleRoleUpdate(user, "user")}
                            >
                              user
                            </button>
                          </li>
                        </ul>
                      )}
                    </div>
                  </th>
                  <th>
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className="w-4 h-4 p-4
                  hover:text-red-500 duration-300 ease-in-out cursor-pointer"
                      onClick={() => handleDeleteButtonClick(user)}
                    />
                  </th>
                </tr>
              ))}
            </thead>
          </table>
          <div className="leading-[50px] p-4 float-end cursor-pointer">
            {/* Tạo các nút chuyển trang */}
            {Array.from({ length: totalPages }).map((_, index) => (
              <p
                key={index}
                className={`w-[40px] h-[40px] leading-[40px] text-center rounded-md inline-block ${
                  currentPage === index + 1
                    ? "hover:bg-[#059669] duration-300 ease-out bg-[#10B981] text-white mr-2"
                    : "hover:bg-[#F3F4F6] duration-300 ease-out bg-[#F3F4F6] text-black mr-2"
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
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg p-6">
            <div className="text-center">
              <FontAwesomeIcon
                icon={faTrashCan}
                className="w-10 h-10 p-5
            text-red-500 duration-300 ease-in-out cursor-pointer"
              />
            </div>
            <p className="text-xl font-bold mb-4">
              Bạn có chắc muốn xóa đơn hàng
              <span className="text-red-500 ml-1">
                {shortenId(selectedUser._id.toUpperCase())}
              </span>
              ?
            </p>
            <p className="mb-4">
              Đơn hàng này sẽ không còn tồn tại trong danh sách nếu như bạn xác
              nhận xóa !
            </p>

            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded-md mr-4
            hover:bg-gray-500 duration-300 ease-in-out"
                onClick={handleCancelDelete}
              >
                Hủy bỏ
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md 
            hover:bg-red-700 duration-300 ease-in-out"
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
