import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Register from "./auth/Register.jsx";
import "./index.css";
import Login from "./auth/login.jsx";
import ProductsPage from "./component/Products.jsx";
import Home from "./pages/Home.jsx";
import Banner from "./component/Banner.jsx";
import Navbar from "./component/Navbar.jsx";
import Footer from "./component/Footer.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/Cartcontext.jsx";
import { ToastContainer } from "react-toastify";
import LearnMore from "./pages/LearnMore.jsx";
import { WishlistProvider } from "./context/Wishlistcontext.jsx";
import Cart from "./pages/cart.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";
import ShippingDetailsPage from "./pages/ShippingDetailsPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";

// Import OrderProvider from the correct path
import { OrderProvider } from "./context/OrderContext.jsx"; // Ensure this path is correct!
import { ShippingProvider } from "./context/ShippingContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <ToastContainer />

    {/* Wrap the entire application with context providers */}
    <AuthProvider>
      <ShippingProvider> {/* ShippingProvider wraps the entire app */}
        <OrderProvider>
          <WishlistProvider>
            <CartProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<App />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/learnmore" element={<LearnMore />} />

                  <Route path="/banner" element={<Banner />} />
                  <Route path="/navbar" element={<Navbar />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/footer" element={<Footer />} />
                  <Route path="/products/:id" element={<ProductDetailsPage />} /> {/* Product Details */}

                  {/* Shipping and Payment routes */}
                  <Route path="/shipping" element={<ShippingDetailsPage />} />
                  <Route path="/payment" element={<PaymentPage />} />
                </Routes>
              </BrowserRouter>
            </CartProvider>
          </WishlistProvider>
        </OrderProvider>
      </ShippingProvider>
    </AuthProvider>
  </>
);
