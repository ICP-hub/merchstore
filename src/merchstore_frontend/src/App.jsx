import React, { useEffect } from "react";
/* import { createClient } from "@connect2ic/core";
import {
  PlugWallet,
  StoicWallet,
  defaultProviders,
} from "@connect2ic/core/providers";
import { ConnectDialog, Connect2ICProvider } from "@connect2ic/react"; */
//import "@connect2ic/core/style.css";
//import * as backend from "../.dfx/local/canisters/backend";
import { AnimatePresence } from "framer-motion";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Error404Page from "./pages/Error404Page";
import HomePage from "./pages/HomePage";
import { Toaster } from "react-hot-toast";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ContactPage from "./pages/ContactPage";
import FaqPage from "./pages/FaqPage";
import MyAddressPage from "./pages/MyAddressPage";
import MyOrderDetailPage from "./pages/MyOrderDetailPage";
import MyOrderInvoicePage from "./pages/MyOrderInvoicePage";
import MyOrderPage from "./pages/MyOrderPage";
import RegisterPage from "./pages/RegisterPage";
import TermOfServicePage from "./pages/TermOfServicePage";
import TeamPage from "./pages/TeamPage";
import ShippingAddressPage from "./pages/ShippingAddressPage";
import ShippingPolicyPage from "./pages/ShippingPolicyPage";
import ReturnPolicyPage from "./pages/ReturnPolicyPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import MyWishlistPage from "./pages/MyWishlistPage";
import MyProfilePage from "./pages/MyProfilePage";
import ProductPage from "./pages/ProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import BackToTop from "./components/common/BackToTop";
import AOS from "aos";
import "aos/dist/aos.css";
import Protected from "./components/common/Protected";
import ProtectedAdmin from "./components/common/ProtectedAdmin";
import AdminHome from "./pages/admin/AdminHome";
import Products from "./pages/admin/Product";
import CreateProduct from "./pages/admin/products/CreateProduct";
import ProductDetail from "./pages/admin/products/Productdetail";
import Categories from "./pages/admin/Categories";
import CreateCategory from "./pages/admin/category/CreateCategory";
import CategoryDetail from "./pages/admin/category/CategoryDetail";
import Order from "./pages/admin/Order";
import OrderDetail from "./pages/admin/order/OrderDetail";
import Invoice from "./pages/admin/invoice";
import Message from "./pages/admin/Message";
import MessageDetail from "./pages/admin/message/MessageDetail";
import UserDetails from "./pages/admin/UserDetails";
import Shipping from "./pages/admin/Shipping";
import "intl-tel-input/build/css/intlTelInput.css";
import "./components/common/Styles/itelinput.css";
import UserBaseLayout from "./pages/userLayout/UserBaseLayout";
// import { DialogContent, DialogTitle } from "@radix-ui/react-dialog";
// import { useIdentityKit } from "@nfid/identitykit/react";
// import { useAuth } from "./auth/useClient";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserBaseLayout />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "cart", element: <CartPage /> },
      { path: "checkout", element: <CheckoutPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "faq", element: <FaqPage /> },
      { path: "my-address", element: <MyAddressPage /> },
      { path: "my-order-detail/:id", element: <MyOrderDetailPage /> },
      { path: "my-order-invoice", element: <MyOrderInvoicePage /> },
      { path: "my-order", element: <MyOrderPage /> },
      {
        path: "my-profile",
        element: (
          <Protected>
            <MyProfilePage />
          </Protected>
        ),
      },
      { path: "my-wishlist", element: <MyWishlistPage /> },
      { path: "order-confirm", element: <OrderConfirmationPage /> },
      { path: "privacy-policy", element: <PrivacyPolicyPage /> },
      { path: "return-policy", element: <ReturnPolicyPage /> },
      { path: "shipping-policy", element: <ShippingPolicyPage /> },
      { path: "shipping-address", element: <ShippingAddressPage /> },
      { path: "about", element: <TeamPage /> },
      { path: "term-of-service", element: <TermOfServicePage /> },
      { path: "product/:slug", element: <ProductDetailPage /> },
      { path: "products", element: <ProductPage /> },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHome></AdminHome>,
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/Products",
    element: (
      <ProtectedAdmin>
        <Products />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/orders",

    element: (
      <ProtectedAdmin>
        <Order />
      </ProtectedAdmin>
    ),
  },

  {
    path: "/admin/orders/:id",
    element: (
      <ProtectedAdmin>
        <OrderDetail />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/invoice/:orderId",
    element: (
      <ProtectedAdmin>
        <Invoice />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/categories",
    element: (
      <ProtectedAdmin>
        <Categories />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/users-list",
    element: (
      <ProtectedAdmin>
        <UserDetails />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/categories/:slug",
    element: (
      <ProtectedAdmin>
        <CategoryDetail />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/categories/create-category",
    element: (
      <ProtectedAdmin>
        <CreateCategory />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/products/create-product",
    element: (
      <ProtectedAdmin>
        <CreateProduct />
      </ProtectedAdmin>
    ),
  },

  {
    path: "/admin/Products/:slug",
    element: (
      <ProtectedAdmin>
        <ProductDetail />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/messages",
    element: (
      <ProtectedAdmin>
        <Message />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/messages/:id",
    element: (
      <ProtectedAdmin>
        <MessageDetail />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/shipping",
    element: (
      <ProtectedAdmin>
        <Shipping />
      </ProtectedAdmin>
    ),
  },

  {
    path: "*",
    element: <Error404Page></Error404Page>,
  },
]);

const App = () => {
  // const { backendActor } = useAuth();
  // console.log("backend actore is ", backendActor);
  useEffect(() => {
    AOS.init();
  }, []);

  // const handleSuccessfullLogin = (res) => {
  //   document.getElementById("ik-identity-kit-modal").classList.add("ik-hidden");
  //   console.log("reponse login success", res);
  // };
  // const {
  //   agent,
  //   isInitializing,
  //   user,
  //   isUserConnecting,
  //   icpBalance,
  //   identity,
  //   signer,
  //   delegationType,
  //   accounts,
  //   connect,
  //   disconnect,
  //   fetchIcpBalance,
  // } = useIdentityKit();

  // useEffect(() => {
  //   console.log("agent", agent);
  //   console.log("user", user);

  //   console.log("icp balance", icpBalance);

  //   console.log("identity is ", identity);
  // }, [user]);

  return (
    <div className="App">
      <Toaster
        position="top-center"
        containerClassName="mt-6"
        reverseOrder={true}
      />
      <BackToTop />

      <AnimatePresence mode="wait" initial={true}>
        <RouterProvider router={router} />
      </AnimatePresence>
    </div>
  );
};

export default () => <App />;
