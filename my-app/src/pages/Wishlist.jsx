import React, { useContext } from "react";
import { WishlistContext } from "../context/Wishlistcontext";
import { CartContext } from "../context/Cartcontext";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const handleRemove = (id, name) => {
    removeFromWishlist(id);
    toast.info(`${name} removed from wishlist`);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleMoveAllToCart = () => {
    wishlist.forEach(item => addToCart(item));
    toast.success("All items moved to cart!");
  };

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-black text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        {/* Premium Header */}
        <div className="max-w-7xl mx-auto text-center mb-12">
          <div className="relative inline-block">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                WISHLIST
              </span>
            </h1>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-[#8B0000] to-transparent"></div>
          </div>
          <p className="text-gray-400 text-lg mt-6">Your curated collection of premium accessories</p>
        </div>

        {wishlist.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 text-gray-600">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <p className="text-gray-400 text-xl mb-4 tracking-wide">YOUR WISHLIST IS EMPTY</p>
            <p className="text-gray-600 mb-8">Start adding your favorite premium accessories</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#8B0000] to-[#A00000] text-white px-8 py-4 rounded-lg font-semibold hover:from-[#A00000] hover:to-[#8B0000] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#8B0000]/20"
            >
              Explore Products
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 p-6 bg-gradient-to-br from-gray-900/50 to-black rounded-2xl border border-gray-800">
              <div className="flex items-center space-x-3 mb-4 sm:mb-0">
                <div className="w-12 h-12 bg-[#8B0000]/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#8B0000]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{wishlist.length} Items</h2>
                  <p className="text-gray-400 text-sm">In your wishlist</p>
                </div>
              </div>
              
              <button
                onClick={handleMoveAllToCart}
                className="bg-gradient-to-r from-[#8B0000] to-[#A00000] text-white px-6 py-3 rounded-lg font-semibold hover:from-[#A00000] hover:to-[#8B0000] transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                Move All to Cart
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>
            </div>

            {/* Wishlist Items Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-gradient-to-br from-gray-900/50 to-black rounded-2xl overflow-hidden border border-gray-800 hover:border-[#8B0000]/30 transition-all duration-500 transform hover:-translate-y-1"
                >
                  {/* Product Image */}
                  <div className="relative aspect-[4/3] bg-gray-800 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemove(item.id, item.name)}
                      className="absolute top-3 right-3 w-8 h-8 bg-black/80 rounded-full flex items-center justify-center text-white hover:bg-[#8B0000] transition-all duration-300 transform hover:scale-110"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>

                    {/* Wishlist Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="text-xs text-white bg-[#8B0000] px-2 py-1 rounded">
                        WISHLIST
                      </span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-[#8B0000] transition-colors duration-300">
                      {item.name}
                    </h3>
                    
                    {item.description && (
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between mb-6">
                      <span className="text-2xl font-bold text-[#8B0000]">
                        ${item.price}
                      </span>
                      <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                        In Stock
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="flex-1 bg-gradient-to-r from-[#8B0000] to-[#A00000] text-white py-3 px-4 rounded-lg font-semibold hover:from-[#A00000] hover:to-[#8B0000] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#8B0000]/20"
                      >
                        Add to Cart
                      </button>

                      <Link
                        to={`/products/${item.id}`}
                        className="w-12 h-12 flex items-center justify-center bg-gray-800 border border-gray-700 text-white rounded-lg hover:bg-[#8B0000] hover:border-[#8B0000] transform hover:scale-110 transition-all duration-300 group"
                      >
                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </Link>
                    </div>
                  </div>

                  {/* Ambient Glow */}
                  <div className="absolute inset-0 border border-transparent group-hover:border-[#8B0000]/10 transition-all duration-500 pointer-events-none" />
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="text-center mt-12">
              <Link
                to="/products"
                className="inline-flex items-center gap-3 bg-transparent border border-gray-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300"
              >
                Continue Shopping
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        )}
      </div>

      <Footer />

      {/* Global Styles */}
      <style jsx global>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}