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
        className={`h-[65px] border-b cursor-pointer fixed right-0 bg-white
        ${headerWidthClass}`}
      >
        <FontAwesomeIcon
          icon={faBars}
          className="p-6 hover:text-[#10B981] duration-300 ease-in-out pl-[10%]"
          onClick={() => {
            toggleNavbar(!isNavbarVisible);
            toggleHeaderWidth();
          }}
        />
        {user && user.role === 'admin' ? (
          <span className="p-6 hover:text-[#10B981] duration-300 ease-in-out pr-[10%] float-end">
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            {user.username}
          </span>
          ) : (      
          <FontAwesomeIcon
          icon={faUser}
          className="p-6 hover:text-[#10B981] duration-300 ease-in-out pr-[10%] float-end"
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
