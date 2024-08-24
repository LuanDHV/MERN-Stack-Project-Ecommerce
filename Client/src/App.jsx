import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { publicRoutes } from "./routes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = document.documentElement.scrollTop;
      setIsVisible(scrolled > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Scroll to top when path changes
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location.pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const isCurrentPageWithOutHeaderFooter = (path) => {
    return (
      path.startsWith("/admin") ||
      path === "/checkout" ||
      path === "/checkoutpay" ||
      path === "/checkoutsuccess"
    );
  };

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {!isCurrentPageWithOutHeaderFooter(location.pathname) && <Header />}
      <Routes>
        {publicRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={<route.page />} />
        ))}
      </Routes>
      {isVisible && (
        <button
          id="scrollToTopButton"
          onClick={scrollToTop}
          className="fixed bottom-10 right-5 h-10 w-10 rounded-full bg-black bg-opacity-50 text-lg text-white duration-300 ease-in-out hover:bg-black"
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      )}
      {!isCurrentPageWithOutHeaderFooter(location.pathname) && <Footer />}
    </>
  );
}
