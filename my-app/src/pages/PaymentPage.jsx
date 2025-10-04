import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useShippingContext } from "../context/ShippingContext";
import { CartContext } from "../context/Cartcontext";
import { AuthContext } from "../context/AuthContext";
import Api from "../auth/api";

const PaymentPage = () => {
  const { shippingDetails, totalAmount } = useShippingContext();
  const { cart, setCart } = useContext(CartContext); // ✅ get cart here
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  useEffect(() => {
    if (!shippingDetails) {
      toast.warning("Please fill shipping details first!");
      navigate("/shipping");
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () => toast.error("Failed to load Razorpay");
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, [shippingDetails, navigate]);

  const handlePaymentSuccess = async (paymentId) => {
    if (!cart || cart.length === 0) {
      toast.error("Cart is empty!");
      return;
    }

    const order = {
      id: new Date().getTime().toString(),
      items: cart,
      shipping: shippingDetails,
      totalAmount,
      paymentId,
      date: new Date().toISOString(),
    };

    const updatedOrders = user.orders ? [...user.orders, order] : [order];

    try {
      await Api.patch(`/users/${user.id}`, {
        cart: [],              // clear cart in DB
        orders: updatedOrders, // add order
      });

      setCart([]); // ✅ clear CartContext
      login({ ...user, cart: [], orders: updatedOrders }); // update AuthContext

      toast.success("Payment successful! Order placed.");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order.");
    }
  };

  const openRazorpay = () => {
    if (!razorpayLoaded) return toast.error("Razorpay not loaded yet");

    const options = {
      key: "rzp_test_edrzdb8Gbx5U5M",
      amount: totalAmount * 100,
      currency: "INR",
      name: "CarX Accessories",
      description: "Order Payment",
      handler: async (response) => await handlePaymentSuccess(response.razorpay_payment_id),
      prefill: {
        name: shippingDetails.fullName,
        contact: shippingDetails.phone,
        email: user.email,
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (!shippingDetails || !user) return null;

  return (
    <div className="payment-page min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Checkout
        </h2>
        <div className="shipping-details bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Shipping Details:
          </h3>
          <p><b>Name:</b> {shippingDetails.fullName}</p>
          <p><b>Address:</b> {shippingDetails.address}</p>
          <p><b>Phone:</b> {shippingDetails.phone}</p>
          <p><b>City:</b> {shippingDetails.city}</p>
          <p><b>Pincode:</b> {shippingDetails.postalCode}</p>
        </div>
        <div className="order-summary mb-6">
          <h3 className="text-xl font-semibold text-gray-700">Order Summary</h3>
          <div className="flex justify-between mt-4">
            <span>Total Amount:</span>
            <span className="font-semibold text-red-500">₹{totalAmount}</span>
          </div>
        </div>
        <button onClick={openRazorpay} className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium text-lg hover:bg-indigo-700 transition">
          Pay Now
        </button>
        <p className="text-center text-sm text-gray-500 mt-6">
          🔒 Secure Payment Powered by Razorpay
        </p>
      </div>
    </div>
  );
};

export default PaymentPage;






































// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useShippingContext } from "../context/ShippingContext";

// const PaymentPage = () => {
//   const { shippingDetails, totalAmount } = useShippingContext();
//   const navigate = useNavigate();
//   const [razorpayLoaded, setRazorpayLoaded] = useState(false);

//   useEffect(() => {
//     if (!shippingDetails) {
//       toast.warning("Please fill shipping details first!");
//       navigate("/shipping");
//       return;
//     }

//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.onload = () => setRazorpayLoaded(true);
//     script.onerror = () => toast.error("Failed to load Razorpay");
//     document.body.appendChild(script);

//     return () => document.body.removeChild(script);
//   }, [shippingDetails, navigate]);

//   const openRazorpay = () => {
//     if (!razorpayLoaded) return toast.error("Razorpay not loaded yet");

//     const options = {
//       key: "rzp_test_edrzdb8Gbx5U5M",
//       amount: totalAmount * 100,
//       currency: "INR",
//       name: "My Shop",
//       description: "Order Payment",
//       handler: (response) =>
//         toast.success(`Payment Successful! ID: ${response.razorpay_payment_id}`),
//       prefill: {
//         name: shippingDetails.fullName,
//         contact: shippingDetails.phone,
//         email: "example@gmail.com",
//       },
//       theme: { color: "#3399cc" },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   if (!shippingDetails) return null;

//   return (
//     <div className="payment-page min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
//         <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
//           Checkout
//         </h2>

//         {/* Shipping Details */}
//         <div className="shipping-details bg-gray-50 p-4 rounded-lg mb-6">
//           <h3 className="text-xl font-semibold text-gray-700 mb-2">
//             Shipping Details:
//           </h3>
//           <p><b>Name:</b> {shippingDetails.fullName}</p>
//           <p><b>Address:</b> {shippingDetails.address}</p>
//           <p><b>Phone:</b> {shippingDetails.phone}</p>
//           <p><b>City:</b> {shippingDetails.city}</p>
//           <p><b>Pincode:</b> {shippingDetails.postalCode}</p>
//         </div>

//         {/* Order Summary */}
//         <div className="order-summary mb-6">
//           <h3 className="text-xl font-semibold text-gray-700">Order Summary</h3>
//           <div className="flex justify-between mt-4">
//             <span>Total Amount:</span>
//             <span className="font-semibold text-red-500">₹{totalAmount}</span>
//           </div>
//         </div>

//         {/* Payment Button */}
//         <button
//           onClick={openRazorpay}
//           className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium text-lg hover:bg-indigo-700 transition"
//         >
//           Pay Now
//         </button>

//         <p className="text-center text-sm text-gray-500 mt-6">
//           🔒 Secure Payment Powered by Razorpay
//         </p>
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;
