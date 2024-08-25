import PropTypes from "prop-types";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import NavbarAdmin from "../components/NavbarAdmin";
import { useSelector } from "react-redux";

export default function HeaderAdmin({ isNavbarVisible, toggleNavbar }) {
  const [headerWidthClass, setHeaderWidthClass] = useState("w-full");

  const toggleHeaderWidth = () => {
    setHeaderWidthClass(isNavbarVisible ? "w-full" : "w-[85%]");
  };

  // Lấy thông tin người dùng từ store
  const user = useSelector((state) => state.user.user);

  return (
    <>
      <div
        className={`fixed right-0 h-[65px] cursor-pointer border-b bg-white ${headerWidthClass}`}
      >
        <FontAwesomeIcon
          icon={faBars}
          className="p-5 pl-[10%] duration-300 ease-in-out hover:text-[#10B981]"
          onClick={() => {
            toggleNavbar(!isNavbarVisible);
            toggleHeaderWidth();
          }}
        />
        {user && user.role === "admin" ? (
          <span className="float-end p-5 pr-[10%] duration-300 ease-in-out hover:text-[#10B981]">
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            {user.username}
          </span>
        ) : (
          <FontAwesomeIcon
            icon={faUser}
            className="float-end p-5 pr-[10%] duration-300 ease-in-out hover:text-[#10B981]"
          />
        )}
      </div>

      {isNavbarVisible && <NavbarAdmin />}
    </>
  );
}

HeaderAdmin.propTypes = {
  isNavbarVisible: PropTypes.bool.isRequired,
  toggleNavbar: PropTypes.func.isRequired,
};
