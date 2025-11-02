// import React, { createContext, useContext, useEffect, useState } from "react";
// import Api from "../auth/api";
// import { AuthContext } from "./AuthContext";

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const { user } = useContext(AuthContext);
//   const [cart, setCart] = useState([]);

//   // 🔹 Always fetch fresh cart when user logs in
//   useEffect(() => {
//     const fetchCart = async () => {
//       if (user) {
//         try {
//           const res = await Api.get(`/users/${user.id}`);
//           setCart(res.data.cart || []);
//         } catch (err) {
//           console.error("Error fetching cart:", err);
//           setCart([]);
//         }
//       } else {
//         setCart([]);
//       }
//     };

//     fetchCart();
//   }, [user]);

//   // Add item to cart
//   const addToCart = async (item) => {
//     if (!user) {
//       alert("Please login to add items to your cart.");
//       return;
//     }

//     const updatedCart = [...cart, item];
//     setCart(updatedCart);

//     try {
//       await Api.patch(`/users/${user.id}`, { cart: updatedCart });
//     } catch (err) {
//       console.error("Error updating cart:", err);
//     }
//   };

//   // Remove item from cart
//   const removeFromCart = async (itemId) => {
//     if (!user) return;

//     const updatedCart = cart.filter((item) => item.id !== itemId);
//     setCart(updatedCart);

//     try {
//       await Api.patch(`/users/${user.id}`, { cart: updatedCart });
//     } catch (err) {
//       console.error("Error removing from cart:", err);
//     }
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };



import React, { createContext, useContext, useEffect, useState } from "react";
import Api from "../auth/api";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify"; // ✅ import toast
import Navbar from "../component/Navbar";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  // Fetch cart whenever user changes
  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        try {
          const res = await Api.get(`/users/${user.id}`);
          setCart(res.data.cart || []);
        } catch (err) {
          console.error("Error fetching cart:", err);
          toast.error("Failed to load cart."); // ✅ toast on error
          setCart([]);
        }
      } else {
        setCart([]);
      }
    };

    fetchCart();
  }, [user]);

  // Add item to cart
  const addToCart = async (item) => {
    if (!user) {
      toast.error("Please login to add items to your cart."); // ✅ toast instead of alert
      return;
    }

    const updatedCart = [...cart, item];
    setCart(updatedCart);

    try {
      await Api.patch(`/users/${user.id}`, { cart: updatedCart });
      toast.success(`${item.name} added to cart!`); // ✅ success toast
    } catch (err) {
      console.error("Error updating cart:", err);
      toast.error("Failed to add item to cart."); // ✅ error toast
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    if (!user) return;

    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);

    try {
      await Api.patch(`/users/${user.id}`, { cart: updatedCart });
      toast.info("Item removed from cart."); // ✅ optional toast
    } catch (err) {
      console.error("Error removing from cart:", err);
      toast.error("Failed to remove item from cart."); // ✅ error toast
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
   
    </CartContext.Provider>
  );
};
