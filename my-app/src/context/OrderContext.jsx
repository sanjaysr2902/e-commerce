// src/context/OrderContext.jsx
import React, { createContext, useState } from "react";

// Create OrderContext
export const OrderContext = createContext();

// Create OrderProvider component to manage global order state
export const OrderProvider = ({ children }) => {
  // Shipping Details (Initially empty)
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    address: "",
    phone: "",
    city: "",
    pincode: "",
    country: "",
  });

  // Total Amount for the order (Can be set based on cart or product price)
  const [totalAmount, setTotalAmount] = useState(0);

  // Function to update shipping details
  const updateShippingDetails = (details) => {
    setShippingDetails(details);
  };

  // Function to update total amount (for cart or buy now)
  const updateTotalAmount = (amount) => {
    setTotalAmount(amount);
  };

  // Handle Cart Payment
  const addCartPayment = (paymentId, amount) => {
    console.log("Cart payment processed", paymentId, amount);
    // Handle cart payment logic here (e.g., save order to backend)
  };

  // Handle Buy Now Payment
  const addBuyNowPayment = (paymentId, amount, productId) => {
    console.log("Buy Now payment processed", paymentId, amount, productId);
    // Handle buy now payment logic here (e.g., save order to backend)
  };

  return (
    <OrderContext.Provider
      value={{
        shippingDetails, // Shipping info
        totalAmount, // Total amount for the order
        updateShippingDetails, // Function to update shipping details
        updateTotalAmount, // Function to update total amount
        addCartPayment, // Function to handle cart payment
        addBuyNowPayment, // Function to handle buy now payment
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
