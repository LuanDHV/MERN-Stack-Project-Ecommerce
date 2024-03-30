import CartPage from "../pages/CartPage/CartPage";
import CheckOutPage from "../pages/CheckOutPage/CheckOutPage";
import CollectionPage from "../pages/CollectionPage/CollectionPage";
import GoodPricePage from "../pages/GoodPricePage/GoodPricePage";
import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import SalePage from "../pages/SalePage/SalePage";
import AllProductsPage from "../pages/AllProductsPage/AllProductsPage";
import DetailProductPage from "../pages/DetailProductPage/DetailProductPage";
import LogInPage from "../pages/LogInPage/LogInPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import CheckOutPayPage from "../pages/CheckOutPayPage/CheckOutPayPage";
import CheckOutSuccessPage from "../pages/CheckOutSuccessPage/CheckOutSuccessPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage/ForgotPasswordPage";
import AccountPage from "../pages/AccountPage/AccountPage";
import AccountOrderPage from "../pages/AccountOrderPage/AccountOrderPage";
import DamPage from "../pages/CategoryProductPage/DamPage";
import AoKieuPage from "../pages/CategoryProductPage/AoKieuPage";
import AoSoMiPage from "../pages/CategoryProductPage/AoSoMiPage";
import AoDaiPage from "../pages/CategoryProductPage/AoDaiPage";
import ResetPasswordPage from "../pages/ForgotPasswordPage/ResetPasswordPage";

import HomeAdminPage from "../admin/pages/HomeAdminPage";
import CustomersAdminPage from "../admin/pages/CustomersAdminPage";
import OrdersAdminPage from "../admin/pages/OrdersAdminPage";
import AdminAccountsPage from "../admin/pages/AdminAccountsPage";
import ProductsAdminPage from "../admin/pages/ProductsAdminPage";

export const publicRoutes = [
  {
    path: "/",
    page: HomePage,
  },
  {
    path: "/danh-muc/tat-ca-san-pham",
    page: AllProductsPage,
  },
  {
    path: "/danh-muc/danh-muc-san-pham",
    page: AllProductsPage,
  },
  {
    path: "/danh-muc/danh-muc-san-pham/dam",
    page: DamPage,
  },
  {
    path: "/danh-muc/danh-muc-san-pham/ao-kieu",
    page: AoKieuPage,
  },
  {
    path: "/danh-muc/danh-muc-san-pham/ao-so-mi",
    page: AoSoMiPage,
  },
  {
    path: "/danh-muc/danh-muc-san-pham/ao-dai",
    page: AoDaiPage,
  },
  {
    path: "/danh-muc/danh-muc-san-pham/ao-dai",
    page: AoDaiPage,
  },
  {
    path: "/danh-muc/bo-suu-tap/sac-mau-ngay-tet",
    page: DamPage,
  },
  {
    path: "/danh-muc/bo-suu-tap/xuan-thi",
    page: AoDaiPage,
  },
  {
    path: "/danh-muc/bo-suu-tap",
    page: CollectionPage,
  },
  {
    path: "/danh-muc/san-pham-gia-tot",
    page: GoodPricePage,
  },
  {
    path: "/danh-muc/sale",
    page: SalePage,
  },
  {
    path: "/san-pham-chi-tiet/:productId",
    page: DetailProductPage,
  },
  {
    path: "/dang-ky",
    page: RegisterPage,
  },
  {
    path: "/dang-nhap",
    page: LogInPage,
  },
  {
    path: "/account",
    page: AccountPage,
  },
  {
    path: "/account-order",
    page: AccountOrderPage,
  },
  {
    path: "/reset",
    page: ForgotPasswordPage,
  },
  {
    path: "/reset-2",
    page: ResetPasswordPage,
  },
  {
    path: "/cart",
    page: CartPage,
  },
  {
    path: "/checkout",
    page: CheckOutPage,
  },
  {
    path: "/checkoutpay",
    page: CheckOutPayPage,
  },
  {
    path: "/checkoutsuccess",
    page: CheckOutSuccessPage,
  },
  {
    path: "*",
    page: NotFoundPage,
  },
  {
    path: "/admin",
    page: HomeAdminPage,
  },
  {
    path: "/admin/danh-muc/san-pham",
    page: ProductsAdminPage,
  },
  {
    path: "/admin/danh-muc/khach-hang",
    page: CustomersAdminPage,
  },
  {
    path: "/admin/danh-muc/don-hang",
    page: OrdersAdminPage,
  },
  {
    path: "/admin/danh-muc/quan-tri-vien",
    page: AdminAccountsPage,
  },
];

export const privateRoutes = [
  {
    path: "/dashboard",
    page: HomePage,
  },
];
