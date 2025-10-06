import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/Cartcontext";
import Api from "../auth/api";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const wrapperRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch products from API for suggestions
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

  // Filter products when typing
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

  // Hide suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && 
          !event.target.closest('.mobile-menu-button')) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return;
    navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    setShowSuggestions(false);
    setIsMobileMenuOpen(false);
  };

  const handleSuggestionClick = (product) => {
    navigate(`/products/${product.id}`);
    setSearchQuery("");
    setShowSuggestions(false);
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  // const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartItemsCount = cart.length

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/95 backdrop-blur-md border-b border-gray-800' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-2">
            <div className="flex-shrink-0 flex items-center">
             <Link to="/"><span className="text-2xl font-bold text-white tracking-tight">
                SARAX
              </span></Link> 
              <span className="ml-1 text-2xl font-bold text-[#8B0000] tracking-tight">
                .
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">

            <Link 
              to="/products" 
              className="text-white font-medium text-sm hover:text-[#8B0000] 
                       transition-colors duration-300 tracking-wide uppercase"
            >
              Products
            </Link>
           
            <Link 
              to="/learnmore" 
              className="text-white font-medium text-sm hover:text-[#8B0000] 
                       transition-colors duration-300 tracking-wide uppercase"
            >
              About
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:block flex-1 max-w-md mx-8 relative" ref={wrapperRef}>
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search premium accessories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => {
                    if (filteredProducts.length > 0) setShowSuggestions(true);
                  }}
                  className="w-full px-4 py-2 pl-10 rounded-lg bg-white/10 backdrop-blur-sm 
                           border border-gray-600 text-white placeholder-gray-400 text-sm
                           focus:outline-none focus:ring-2 focus:ring-[#8B0000] focus:border-transparent
                           transition-all duration-200"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </form>

            {/* Search Suggestions */}
            {showSuggestions && filteredProducts.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 rounded-lg shadow-xl 
                            border border-gray-700 max-h-64 overflow-auto z-50">
                <ul className="py-2">
                  {filteredProducts.map((product) => (
                    <li
                      key={product.id}
                      onClick={() => handleSuggestionClick(product)}
                      className="px-4 py-3 hover:bg-[#8B0000]/20 cursor-pointer border-b border-gray-800 last:border-b-0
                               transition-colors duration-150 group"
                    >
                      <div className="text-white font-medium group-hover:text-[#8B0000] text-sm">
          <img 
            src={product.image}
            alt={product.name} 
            className="w-8 h-8 object-cover rounded" 
          />

                        {product.name}
                      </div>
                      {product.category && (
                        <div className="text-xs text-gray-400 mt-1">{product.category}</div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Section - Cart & User */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <Link 
              to="/cart" 
              className="relative p-2 text-white hover:text-[#8B0000] transition-colors duration-300"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#8B0000] text-white text-xs rounded-full 
                               h-5 w-5 flex items-center justify-center font-medium">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* Wishlist Icon */}
            <Link 
              to="/wishlist" 
              className="p-2 text-white hover:text-[#8B0000] transition-colors duration-300"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </Link>

            {/* User Section */}
            <div className="hidden md:flex items-center space-x-3">
              {!user ? (
                <div className="flex items-center space-x-3">
                  <Link 
                    to="/login" 
                    className="text-white font-medium text-sm hover:text-[#8B0000] 
                             transition-colors duration-300 px-4 py-2"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="bg-[#8B0000] text-white font-medium text-sm hover:bg-[#A00000] 
                             transition-colors duration-300 px-4 py-2 rounded"
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <div className="flex items-center space-x-3"><Link to="/profile">
                  <div className="flex items-center space-x-2 bg-white/5 px-3 py-2 rounded">
                    <div className="w-6 h-6 bg-[#8B0000] rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-xs">
                        {user.username?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-white font-medium text-sm">
                      
                      {user.username}
                    </span>
                  </div></Link>
                  <button
                    onClick={handleLogout}
                    className="text-white font-medium text-sm hover:text-[#8B0000] 
                             transition-colors duration-300 px-3 py-2"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="mobile-menu-button md:hidden p-2 text-white hover:text-[#8B0000] transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div ref={mobileMenuRef} className="md:hidden absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-md 
                                           border-b border-gray-800 shadow-xl">
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Search */}
              <div className="relative" ref={wrapperRef}>
                <form onSubmit={handleSearchSubmit}>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-3 pl-10 rounded-lg bg-white/10 border border-gray-600 
                               text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 
                               focus:ring-[#8B0000] focus:border-transparent"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </form>
              </div>

              {/* Mobile Navigation Links */}
              <div className="space-y-2">

                <Link 
                  to="/products" 
                  onClick={handleNavClick}
                  className="block text-white font-medium py-3 px-4 hover:bg-[#8B0000]/20 rounded-lg 
                           transition-colors duration-300 border-b border-gray-800"
                >
                  Products
                </Link>
                {/* <Link 
                  to="/premium" 
                  onClick={handleNavClick}
                  className="block text-white font-medium py-3 px-4 hover:bg-[#8B0000]/20 rounded-lg 
                           transition-colors duration-300 border-b border-gray-800"
                >
                  Premium
                </Link> */}
                <Link 
                  to="/learnmore" 
                  onClick={handleNavClick}
                  className="block text-white font-medium py-3 px-4 hover:bg-[#8B0000]/20 rounded-lg 
                           transition-colors duration-300 border-b border-gray-800"
                >
                  About
                </Link>
                <Link 
                  to="/wishlist" 
                  onClick={handleNavClick}
                  className="block text-white font-medium py-3 px-4 hover:bg-[#8B0000]/20 rounded-lg 
                           transition-colors duration-300 border-b border-gray-800"
                >
                  Wishlist
                </Link>
                <Link 
                  to="/cart" 
                  onClick={handleNavClick}
                  className="block text-white font-medium py-3 px-4 hover:bg-[#8B0000]/20 rounded-lg 
                           transition-colors duration-300 flex items-center justify-between"
                >
                  <span>Cart</span>
                  {cartItemsCount > 0 && (
                    <span className="bg-[#8B0000] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </Link>
              </div>

              {/* Mobile User Section */}
              <div className="pt-4 border-t border-gray-800">
                {!user ? (
                  <div className="flex space-x-3">
                    <Link 
                      to="/login" 
                      onClick={handleNavClick}
                      className="flex-1 text-center text-white font-medium py-3 px-4 border border-gray-600 
                               rounded-lg hover:bg-white/10 transition-colors duration-300"
                    >
                      Login
                    </Link>
                    <Link 
                      to="/register" 
                      onClick={handleNavClick}
                      className="flex-1 text-center bg-[#8B0000] text-white font-medium py-3 px-4 
                               rounded-lg hover:bg-[#A00000] transition-colors duration-300"
                    >
                      Register
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 bg-white/5 px-4 py-3 rounded-lg">
                      <div className="w-8 h-8 bg-[#8B0000] rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          {user.username?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-white font-medium">
                        {user.username}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-white font-medium py-3 px-4 border border-gray-600 
                               rounded-lg hover:bg-white/10 transition-colors duration-300 text-center"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}