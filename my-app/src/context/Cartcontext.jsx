import React, { createContext, useContext, useEffect, useState } from "react";
import Api from "../auth/api";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);

  // Fetch cart when user logs in
  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        try {
          const res = await Api.get(`/users/${user.id}`);
          setCart(res.data.cart || []);
        } catch (err) {
          console.error("Error fetching cart:", err);
          toast.error("Failed to load cart.");
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
      toast.error("Please login to add items to your cart.");
      return;
    }

    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    let updatedCart;

    if (existingItem) {
      updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      updatedCart = [...cart, { ...item, quantity: 1 }];
    }

    setCart(updatedCart);

    try {
      await Api.patch(`/users/${user.id}`, { cart: updatedCart });
      toast.success(`${item.name} added to cart!`);
    } catch (err) {
      console.error("Error updating cart:", err);
      toast.error("Failed to add item to cart.");
    }
  };

  // Remove item
  const removeFromCart = async (itemId) => {
    if (!user) return;
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);

    try {
      await Api.patch(`/users/${user.id}`, { cart: updatedCart });
      toast.info("Item removed from cart.");
    } catch (err) {
      console.error("Error removing from cart:", err);
      toast.error("Failed to remove item from cart.");
    }
  };

  // Decrement quantity
  const decrementQuantity = async (itemId) => {
    if (!user) return;
    const updatedCart = cart.map((item) =>
      item.id === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);

    try {
      await Api.patch(`/users/${user.id}`, { cart: updatedCart });
    } catch (err) {
      console.error("Error updating cart:", err);
      toast.error("Failed to update cart.");
    }
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, decrementQuantity }}>
      {children}
    </CartContext.Provider>
  );
};





































