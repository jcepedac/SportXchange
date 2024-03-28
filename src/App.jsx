import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import {
  AdminRoute,
  Modal,
  Navbar,
  ProductDetails,
  ProtectedRoute,
  PostAD,
  Footer
} from "./components";
import {
  Admin,
  AllProducts,
  Cart,
  Checkout,
  CheckoutDetails,
  CheckoutSuccess,
  Contact,
  Home,
  NotFound,
  OrderDetails,
  OrderHistory,
  SoldHistory,
  ResetPassword,
  Review,
  UserProfile
} from "./pages";

const App = () => {
  return (
    <>

      <ToastContainer position="bottom-right" autoClose={4000} closeOnClick />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/my-orders"
          element={
            <ProtectedRoute>
              <OrderHistory />
            </ProtectedRoute>
          }
        />
        <Route path="/order-details/:id" element={<OrderDetails />} />
        <Route
          path="/review-product/:id"
          element={
            <ProtectedRoute>
              <Review />
            </ProtectedRoute>
          }
        />

        <Route
          path="/i-sold"
          element={
            <ProtectedRoute>
              <SoldHistory />
            </ProtectedRoute>
          }
        />
        <Route path="/post-ad" element={<PostAD />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/all" element={<AllProducts />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout-details" element={<CheckoutDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />
        {/* ADMIN ROUTES */}
        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
        <Route path="/user-profile" element={<UserProfile />} />
        {/* 404 routes */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Modal />
    </>
  );
};

export default App;
