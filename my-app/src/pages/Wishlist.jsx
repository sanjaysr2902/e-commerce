import React, { useContext } from "react";
import { WishlistContext } from "../context/Wishlistcontext";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { toast } from "react-toastify";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);

  // Optional: handle remove with toast
  const handleRemove = (id, name) => {
    removeFromWishlist(id);
    toast.info(`${name} removed from wishlist`);
  };

  return (
    <>
      {/* Navbar at top */}
      <Navbar />

      {/* Main content with top padding to avoid overlapping fixed navbar */}
      <div className="min-h-screen bg-black p-6 pt-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-red-500">🛒 Your Wishlist</h1>

          {wishlist.length === 0 ? (
            <p className="text-gray-300 text-lg">Your wishlist is empty.</p>
          ) : (
            <ul className="space-y-4">
              {wishlist.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col md:flex-row items-center justify-between p-4 border border-gray-700 rounded-lg shadow-sm bg-gray-900"
                >
                  {/* Left: Image and Name */}
                  <div className="flex items-center gap-4 md:w-1/2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <span className="text-white font-medium text-lg">{item.name}</span>
                  </div>

                  {/* Right: Price and Remove */}
                  <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <span className="text-white font-semibold">${item.price}</span>
                    <button
                      onClick={() => handleRemove(item.id, item.name)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Footer at bottom */}
      <Footer />
    </>
  );
}
