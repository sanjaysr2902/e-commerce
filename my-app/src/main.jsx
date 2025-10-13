import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import App from "./App.jsx";
import Register from "./auth/Register.jsx";
import Login from "./auth/login.jsx";
import ProductsPage from "./component/Products.jsx";
import Banner from "./component/Banner.jsx";
import Navbar from "./component/Navbar.jsx";
import Footer from "./component/Footer.jsx";
import LearnMore from "./pages/LearnMore.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import ShippingPage from "./pages/ShippingPage.jsx";
import Cart from "./pages/Cart.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/Cartcontext.jsx";
import { WishlistProvider } from "./context/Wishlistcontext.jsx";
// import { OrderProvider } from "./context/OrderContext.jsx";
import { ShippingProvider } from "./context/ShippingContext.jsx";

import ProtectedRoute from "./component/ProtectedRoute.jsx";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/Profile.jsx";
import AdminDashboard from "./admin/AdminDashBoarder.jsx";
import ManageProducts from "./admin/ManageProduct.jsx";
import AdminLayout from "./admin/AdminLayout.jsx";
import ManageUsers from "./admin/ManageUser.jsx";
import AdminOrders from "./admin/ManageOrder.jsx";
import Orders from "./pages/Orders.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <ToastContainer />
    <AuthProvider>
      <ShippingProvider>
          <WishlistProvider>
            <CartProvider>
              <BrowserRouter>
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<App />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/products/:id" element={<ProductDetailsPage />} />
                  <Route path="/learnmore" element={<LearnMore />} />
                  <Route path="/banner" element={<Banner />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/admin" element={<AdminDashboard />} />

                  <Route path="/navbar" element={<Navbar />} />
                  <Route path="/footer" element={<Footer />} />
                  <Route path="/orders" element={<Orders/>} />

                  {/* Protected routes */}
                  <Route
                    path="/wishlist"
                    element={
                      <ProtectedRoute>
                        <Wishlist />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/cart"
                    element={
                      <ProtectedRoute>
                        <Cart />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/shipping"
                    element={
                      <ProtectedRoute>
                        <ShippingPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/payment"
                    element={
                      <ProtectedRoute>
                        <PaymentPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute adminOnly={true}>
                        <AdminLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<AdminDashboard />} />
                    <Route path="products" element={<ManageProducts />} />
                    {/* <Route path="users" element={<ManageUser />} /> */}
                    {/* <Route path="orders" element={<ManageOrder />} /> */}
                    <Route path="/admin/users" element={<ManageUsers />} />
                      <Route path="/admin/orders" element={<AdminOrders />} />


                  </Route>

                </Routes>
              </BrowserRouter>
            </CartProvider>
          </WishlistProvider>
      </ShippingProvider>
    </AuthProvider>
  </>
);

