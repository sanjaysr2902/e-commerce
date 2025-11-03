import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Api from "../auth/api"; // ⬅️ fetch products from API

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [allProducts, setAllProducts] = useState([]); // ⬅️ fetched products

  const wrapperRef = useRef(null);

  // ⬅️ Fetch products from API for suggestions
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await Api.get("/products");
        setAllProducts(res.data);
      } catch (err) {
        console.error("Error fetching products in Navbar:", err);
      }
    };
    fetchProducts();
  }, []);

  // ⬅️ Filter products when typing
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = allProducts.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
    setShowSuggestions(true);
  }, [searchQuery, allProducts]);

  // ⬅️ Hide suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return;
    navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (product) => {
    navigate(`/products/${product.id}`);
    setSearchQuery("");
    setShowSuggestions(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between p-4 text-white bg-transparent">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <img src="/logo.png" alt="Logo" className="h-10 w-10 object-contain" />
        <span className="text-xl font-bold text-[#8B0000]">Sarax</span> {/* Dark Red color */}
      </div>

      {/* Search bar */}
      <div className="flex-1 mx-6 max-w-md relative" ref={wrapperRef}>
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {
              if (filteredProducts.length > 0) setShowSuggestions(true);
            }}
            className="w-full px-3 py-1 rounded-md text-black"
          />
        </form>

        {showSuggestions && filteredProducts.length > 0 && (
          <ul className="absolute top-full left-0 right-0 bg-white text-black rounded-md shadow-lg max-h-60 overflow-auto mt-1 z-50">
            {filteredProducts.map((product) => (
              <li
                key={product.id}
                onClick={() => handleSuggestionClick(product)}
                className="cursor-pointer px-4 py-2 hover:bg-gray-200"
              >
                {product.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Nav Links */}
      <ul className="flex space-x-6 items-center font-bold">
        <li>
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
        </li>
        <li>
          <Link to="/products" className="hover:text-gray-300">
            Products
          </Link>
        </li>
        <li>
          <Link to="/wishlist" className="hover:text-gray-300">
            Wishlist
          </Link>
        </li>
        <li>
          <Link to="/cart" className="hover:text-gray-300">
            Cart
          </Link>
        </li>

        {!user ? (
          <>
            <li>
              <Link to="/register" className="hover:text-gray-300">
                Register
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-gray-300">
                Login
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="text-gray-300">Hi, {user.username}</li>
            <li>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-400 transition"
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
