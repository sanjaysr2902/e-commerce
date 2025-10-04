import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import App from "./App.jsx";
import Register from "./auth/Register.jsx";
import Login from "./auth/Login.jsx";
import ProductsPage from "./component/Products.jsx";
import Banner from "./component/Banner.jsx";
import Navbar from "./component/Navbar.jsx";
import Footer from "./component/Footer.jsx";
import LearnMore from "./pages/LearnMore.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import ShippingPage from "./pages/ShippingPage.jsx";
import Cart from "./pages/cart.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/Cartcontext.jsx";
import { WishlistProvider } from "./context/Wishlistcontext.jsx";
import { OrderProvider } from "./context/OrderContext.jsx";
import { ShippingProvider } from "./context/ShippingContext.jsx";

import ProtectedRoute from "./component/ProtectedRoute.jsx";

import "./index.css";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <ToastContainer />
    <AuthProvider>
      <ShippingProvider>
        <OrderProvider>
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
                  <Route path="/navbar" element={<Navbar />} />
                  <Route path="/footer" element={<Footer />} />

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
                </Routes>
              </BrowserRouter>
            </CartProvider>
          </WishlistProvider>
        </OrderProvider>
      </ShippingProvider>
    </AuthProvider>
  </>
);



































































// import ReactDOM from "react-dom/client";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import App from "./App.jsx";
// import Register from "./auth/Register.jsx";
// import Login from "./auth/Login.jsx";
// import "./index.css";
// import ProductsPage from "./component/Products.jsx";
// import Banner from "./component/Banner.jsx";
// import Navbar from "./component/Navbar.jsx";
// import Footer from "./component/Footer.jsx";
// import LearnMore from "./pages/LearnMore.jsx";
// import Wishlist from "./pages/Wishlist.jsx";
// import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";
// import PaymentPage from "./pages/PaymentPage.jsx";
// import ShippingPage from "./pages/ShippingPage.jsx";

// import { ToastContainer } from "react-toastify";
// import { AuthProvider } from "./context/AuthContext.jsx";
// import { CartProvider } from "./context/Cartcontext.jsx";
// import { WishlistProvider } from "./context/Wishlistcontext.jsx";
// import { OrderProvider } from "./context/OrderContext.jsx";
// import { ShippingProvider } from "./context/ShippingContext.jsx";
// import Cart from "./pages/cart.jsx";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <>
//     <ToastContainer />
//     <AuthProvider>
//       <ShippingProvider>
//         <OrderProvider>
//           <WishlistProvider>
//             <CartProvider>
//               <BrowserRouter>
//                 <Routes>
//                   <Route path="/" element={<App />} />
//                   <Route path="/login" element={<Login />} />
//                   <Route path="/register" element={<Register />} />
//                   <Route path="/products" element={<ProductsPage />} />
//                   <Route path="/learnmore" element={<LearnMore />} />
//                   <Route path="/banner" element={<Banner />} />
//                   <Route path="/navbar" element={<Navbar />} />
//                   <Route path="/wishlist" element={<Wishlist />} />
//                   <Route path="/cart" element={<Cart />} />
//                   <Route path="/footer" element={<Footer />} />
//                   <Route path="/products/:id" element={<ProductDetailsPage />} />
//                   <Route path="/shipping" element={<ShippingPage />} />
//                   <Route path="/payment" element={<PaymentPage />} />
//                 </Routes>
//               </BrowserRouter>
//             </CartProvider>
//           </WishlistProvider>
//         </OrderProvider>
//       </ShippingProvider>
//     </AuthProvider>
//   </>
// );
