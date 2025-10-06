



import React, { createContext, useContext, useEffect, useState } from "react";
import Api from "../auth/api";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify"; // ✅ import toast

// Create WishlistContext as a named export
export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]); // lowercase for clarity

  // Fetch wishlist whenever user changes
  useEffect(() => {
    const fetchWishlist = async () => {
      if (user) {
        try {
          const res = await Api.get(`/users/${user.id}`);
          setWishlist(res.data.wishlist || []); // backend key should be lowercase
        } catch (err) {
          console.error("Error fetching wishlist:", err);
          toast.error("Failed to load wishlist."); // ✅ toast on error
          setWishlist([]);
        }
      } else {
        setWishlist([]);
      }
    };

    fetchWishlist();
  }, [user]);

  // Add an item to wishlist
  const addToWishlist = async (item) => {
    if (!user) {
      toast.error("Please login to add items to your wishlist."); // ✅ use toast instead of alert
      return;
    }

    const updatedWishlist = [...wishlist, item];
    setWishlist(updatedWishlist);

    try {
      await Api.patch(`/users/${user.id}`, { wishlist: updatedWishlist });
      toast.success(`${item.name} added to wishlist!`); // ✅ success toast
    } catch (err) {
      console.error("Error updating wishlist:", err);
      toast.error("Failed to add item to wishlist."); // ✅ error toast
    }
  };

  // Remove an item from wishlist
  const removeFromWishlist = async (itemId) => {
    if (!user) return;

    const updatedWishlist = wishlist.filter((item) => item.id !== itemId);
    setWishlist(updatedWishlist);

    try {
      await Api.patch(`/users/${user.id}`, { wishlist: updatedWishlist });
      toast.info("Item removed from wishlist."); // ✅ optional toast
    } catch (err) {
      console.error("Error removing from wishlist:", err);
      toast.error("Failed to remove item from wishlist."); // ✅ error toast
    }
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
    
  );
};
