import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Api from "../auth/api";
import Navbar from "./Navbar";
import { CartContext } from "../context/Cartcontext";
import { WishlistContext } from "../context/Wishlistcontext";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All"); // 👈 new

  const navigate = useNavigate();
  const { cart, addToCart } = useContext(CartContext);
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await Api.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Get unique categories from products
  const categories = ["All", ...new Set(products.map((p) => p.category || "Other"))];

  // ✅ Filter products by category + search
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm);
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const isInCart = (productId) => cart.some((item) => item.id === productId);
  const isInWishlist = (productId) =>
    wishlist.some((item) => item.id === productId);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleWishlistToggle = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-2 border-gray-600 border-t-[#8B0000] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <section className="min-h-screen bg-black text-white py-8 px-4 sm:px-6 pt-24">
        {/* Premium Header */}
        <div className="text-center mb-10">
          <div className="relative inline-block">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wide mb-4">
              <span className="text-white">SARAX</span>
              <br />
              <span className="text-[#8B0000] font-normal">ACCESSORIES</span>
            </h1>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-transparent via-[#8B0000] to-transparent"></div>
          </div>

          {searchTerm && (
            <p className="text-gray-400 text-sm mt-8 tracking-wide">
              Search results for:{" "}
              <span className="text-white font-light">"{searchTerm}"</span>
            </p>
          )}
        </div>

        {/* ✅ Category Filter Bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 border rounded-full text-sm tracking-wide transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-[#8B0000] border-[#8B0000] text-white"
                  : "border-gray-700 text-gray-400 hover:border-[#8B0000] hover:text-[#8B0000]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product List */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 text-gray-600">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <p className="text-gray-400 text-lg mb-2 tracking-wide">
              NO PRODUCTS FOUND
            </p>
            <p className="text-gray-600 text-sm">
              Please try different search or category
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
            {filteredProducts.map((product, index) => {
              const productInCart = isInCart(product.id);
              const productInWishlist = isInWishlist(product.id);

              return (
                <div
                  key={product.id}
                  className="group relative bg-gradient-to-br from-gray-900/50 to-black rounded-none overflow-hidden border border-gray-800 hover:border-[#8B0000]/30 transition-all duration-500"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  {/* Product Image */}
                  <div
                    className="relative aspect-[4/3] bg-gray-900 overflow-hidden cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        hoveredProduct === product.id ? "scale-105" : "scale-100"
                      }`}
                    />

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                    <div className="absolute top-4 left-4">
                      <span className="text-xs text-white bg-[#8B0000] px-3 py-1 tracking-wide">
                        PREMIUM
                      </span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-black/80 text-white px-4 py-2 rounded text-sm tracking-wide">
                        QUICK VIEW
                      </div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6 border-t border-gray-800">
                    <h2
                      className="text-lg font-normal mb-3 text-white tracking-wide uppercase cursor-pointer hover:text-[#8B0000] transition-colors"
                      onClick={() => setSelectedProduct(product)}
                    >
                      {product.name}
                    </h2>

                    <p className="text-gray-400 text-sm mb-4 leading-relaxed tracking-wide line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between mb-6">
                      <span className="text-xl font-light text-[#8B0000] tracking-wider">
                        ${product.price}
                      </span>
                      <span className="text-xs text-gray-500 tracking-wide">
                        IN STOCK
                      </span>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() =>
                          productInCart
                            ? navigate("/cart")
                            : handleAddToCart(product)
                        }
                        className={`flex-1 border py-3 px-4 font-light tracking-wide transition-all duration-300 text-sm uppercase ${
                          productInCart
                            ? "bg-[#8B0000] border-[#8B0000] text-white hover:bg-[#700000]"
                            : "bg-transparent border-[#8B0000] text-white hover:bg-[#8B0000]"
                        }`}
                      >
                        {productInCart ? "Go to Cart" : "Add to Cart"}
                      </button>

                      {/* Wishlist Toggle */}
                      <button
                        onClick={() => handleWishlistToggle(product)}
                        className={`w-12 h-12 flex items-center justify-center border transition-all duration-300 group ${
                          productInWishlist
                            ? "border-[#8B0000] bg-[#8B0000] text-white hover:bg-transparent hover:text-[#8B0000]"
                            : "border-gray-700 text-gray-400 hover:border-[#8B0000] hover:text-[#8B0000]"
                        }`}
                      >
                        <svg
                          className={`w-5 h-5 transition-transform duration-300 ${
                            productInWishlist ? "scale-110" : ""
                          }`}
                          fill={productInWishlist ? "currentColor" : "none"}
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal (unchanged) */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-800">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="aspect-[4/3] bg-gray-800">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-2xl font-light text-white tracking-wide uppercase">
                      {selectedProduct.name}
                    </h2>
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {selectedProduct.description}
                  </p>

                  <div className="mb-8">
                    <span className="text-3xl font-light text-[#8B0000] tracking-wider">
                      ${selectedProduct.price}
                    </span>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        if (isInCart(selectedProduct.id)) {
                          navigate("/cart");
                        } else {
                          handleAddToCart(selectedProduct);
                        }
                        setSelectedProduct(null);
                      }}
                      className={`flex-1 border py-4 px-6 font-light tracking-wide transition-all duration-300 text-sm uppercase ${
                        isInCart(selectedProduct.id)
                          ? "bg-[#8B0000] border-[#8B0000] text-white"
                          : "bg-transparent border-[#8B0000] text-white hover:bg-[#8B0000]"
                      }`}
                    >
                      {isInCart(selectedProduct.id)
                        ? "View in Cart"
                        : "Add to Cart"}
                    </button>

                    <button
                      onClick={() => handleWishlistToggle(selectedProduct)}
                      className={`w-14 h-14 flex items-center justify-center border transition-all duration-300 ${
                        isInWishlist(selectedProduct.id)
                          ? "border-[#8B0000] bg-[#8B0000] text-white hover:bg-transparent hover:text-[#8B0000]"
                          : "border-gray-600 text-gray-400 hover:border-[#8B0000] hover:text-[#8B0000]"
                      }`}
                    >
                      <svg
                        className={`w-6 h-6 transition-transform duration-300 ${
                          isInWishlist(selectedProduct.id) ? "scale-110" : ""
                        }`}
                        fill={
                          isInWishlist(selectedProduct.id)
                            ? "currentColor"
                            : "none"
                        }
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Styles */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .grid > div {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: #1f2937;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #8b0000;
        }
      `}</style>
    </>
  );
}
