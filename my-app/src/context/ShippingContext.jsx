

import React, { createContext, useContext, useState } from "react";

const ShippingContext = createContext();

export const ShippingProvider = ({ children }) => {
  const [shippingDetails, setShippingDetails] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);


  const updateShippingDetails = (details, amount) => {
    setShippingDetails(details);
    setTotalAmount(amount);
  };

  return (
    <ShippingContext.Provider
      value={{ shippingDetails, totalAmount, updateShippingDetails }}
    >
      {children}
    </ShippingContext.Provider>
  );
};

export const useShippingContext = () => useContext(ShippingContext);
