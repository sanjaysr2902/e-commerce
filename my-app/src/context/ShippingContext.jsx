import React, { createContext, useContext, useState } from "react";

// Create the ShippingContext
export const ShippingContext = createContext();

// ShippingContext Provider to share the data
export const ShippingProvider = ({ children }) => {
  const [shippingDetails, setShippingDetails] = useState(null);

  // Update the shipping details
  const updateShippingDetails = (details) => {
    setShippingDetails(details);
  };

  return (
    <ShippingContext.Provider value={{ shippingDetails, updateShippingDetails }}>
      {children}
    </ShippingContext.Provider>
  );
};

// Custom hook to use ShippingContext in any component
export const useShippingContext = () => useContext(ShippingContext);
