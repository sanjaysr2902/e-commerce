import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // For getting the passed data from location.state
import { toast } from "react-toastify";

const PaymentPage = () => {
  const location = useLocation();
  const { shippingDetails, totalAmount } = location.state || {};  // Access passed data

  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  useEffect(() => {
    // Dynamically load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () => {
      toast.error("Failed to load Razorpay. Please try again.");
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Function to open Razorpay payment window
  const openRazorpay = () => {
    if (!razorpayLoaded) {
      toast.error("Razorpay is not loaded yet. Please try again.");
      return;
    }

    const options = {
      key: "rzp_test_edrzdb8Gbx5U5M", // Razorpay test key (replace with your live key)
      amount: totalAmount * 100, // Convert to paise
      currency: "INR",
      name: "My Shop",
      description: "Test Transaction",
      handler: function (response) {
        toast.success(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        // Additional actions after payment is successful
      },
      prefill: {
        name: shippingDetails?.fullName || "John Doe",
        email: "johndoe@example.com", // Ideally use the user's email
        contact: shippingDetails?.phone || "9876543210", // Use the phone number from shipping details
      },
      theme: {
        color: "#3399cc", // Customize the Razorpay button color
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="payment-page min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Checkout</h2>
        
        {/* Display shipping details */}
        <div className="shipping-details bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Shipping Details:</h3>
          <p><b>Name:</b> {shippingDetails?.fullName}</p>
          <p><b>Address:</b> {shippingDetails?.address}</p>
          <p><b>Phone:</b> {shippingDetails?.phone}</p>
          <p><b>City:</b> {shippingDetails?.city}</p>
          <p><b>Pincode:</b> {shippingDetails?.postalCode}</p>
        </div>

        {/* Display total amount */}
        <div className="order-summary mb-6">
          <h3 className="text-xl font-semibold text-gray-700">Order Summary</h3>
          <div className="flex justify-between mt-4">
            <span className="font-medium text-gray-600">Total Amount:</span>
            <span className="font-semibold text-red-500">₹{totalAmount}</span>
          </div>
        </div>

        {/* Payment Button */}
        <div className="payment-button">
          <button
            onClick={openRazorpay}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium text-lg hover:bg-indigo-700 transition"
          >
            Pay Now
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          🔒 Secure Payment Powered by Razorpay
        </p>
      </div>
    </div>
  );
};

export default PaymentPage;
