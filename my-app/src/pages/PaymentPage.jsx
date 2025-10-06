import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useShippingContext } from "../context/ShippingContext";
import { CartContext } from "../context/Cartcontext";
import { AuthContext } from "../context/AuthContext";
import Api from "../auth/api";

const PaymentPage = () => {
  const { shippingDetails, totalAmount } = useShippingContext();
  const { cart, setCart } = useContext(CartContext);
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!shippingDetails) {
      toast.warning("Please fill shipping details first!");
      navigate("/shipping");
      return;
    }
    
    if (!cart || cart.length === 0) {
      toast.warning("Your cart is empty!");
      navigate("/cart");
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () => toast.error("Failed to load payment gateway");
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, [shippingDetails, navigate, cart]);

  const handlePaymentSuccess = async (paymentId) => {
    setIsProcessing(true);
    
    if (!cart || cart.length === 0) {
      toast.error("Cart is empty!");
      setIsProcessing(false);
      return;
    }

    const order = {
      id: new Date().getTime().toString(),
      items: cart,
      shipping: shippingDetails,
      totalAmount,
      paymentId,
      date: new Date().toISOString(),
      status: "Confirmed"
    };

    const updatedOrders = user.orders ? [...user.orders, order] : [order];

    try {
      await Api.patch(`/users/${user.id}`, {
        cart: [],
        orders: updatedOrders,
      });

      setCart([]);
      login({ ...user, cart: [], orders: updatedOrders });

      toast.success("🎉 Payment successful! Order confirmed.");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to process order.");
      setIsProcessing(false);
    }
  };

  const openRazorpay = () => {
    if (!razorpayLoaded) {
      toast.error("Payment gateway loading...");
      return;
    }

    if (isProcessing) return;

    const options = {
      key: "rzp_test_edrzdb8Gbx5U5M",
      amount: totalAmount * 100,
      currency: "INR",
      name: "SARAX Premium Accessories",
      description: "Premium Automotive Accessories Order",
      handler: async (response) => await handlePaymentSuccess(response.razorpay_payment_id),
      prefill: {
        name: shippingDetails.fullName,
        contact: shippingDetails.phone,
        email: user.email,
      },
      theme: { color: "#8B0000" },
      modal: {
        ondismiss: () => setIsProcessing(false),
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (!shippingDetails || !user) return null;

  const shippingFee = 15.00;
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Premium Header */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <div className="relative inline-block">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              CHECKOUT
            </span>
          </h1>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-[#8B0000] to-transparent"></div>
        </div>
        <p className="text-gray-400 text-lg mt-6">Complete your premium purchase</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Details */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-gray-900/50 to-black rounded-2xl overflow-hidden border border-gray-800 hover:border-[#8B0000]/30 transition-all duration-500 shadow-2xl">
            <div className="p-8">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-10 h-10 bg-[#8B0000] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Payment Details</h2>
                  <p className="text-gray-400 text-sm">Secure payment processing</p>
                </div>
              </div>

              {/* Shipping Details Card */}
              <div className="bg-gray-800/50 rounded-xl p-6 mb-8 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#8B0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    Shipping Address
                  </h3>
                  <button 
                    onClick={() => navigate('/shipping')}
                    className="text-[#8B0000] text-sm hover:text-[#A00000] transition-colors duration-300"
                  >
                    Edit
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                  <div>
                    <p className="text-sm text-gray-400">Full Name</p>
                    <p className="text-white font-medium">{shippingDetails.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <p className="text-white font-medium">{shippingDetails.phone}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-400">Address</p>
                    <p className="text-white font-medium">{shippingDetails.address}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">City</p>
                    <p className="text-white font-medium">{shippingDetails.city}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Postal Code</p>
                    <p className="text-white font-medium">{shippingDetails.postalCode}</p>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#8B0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Payment Method
                </h3>
                <div className="flex items-center justify-between p-4 bg-gray-900 rounded-lg border-2 border-[#8B0000]">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-6 bg-[#8B0000] rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">RZP</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Razorpay</p>
                      <p className="text-gray-400 text-sm">Secure payment gateway</p>
                    </div>
                  </div>
                  <div className="w-6 h-6 bg-[#8B0000] rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Pay Now Button */}
              <button 
                onClick={openRazorpay}
                disabled={isProcessing}
                className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 mt-8 ${
                  isProcessing 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-[#8B0000] to-[#A00000] hover:from-[#A00000] hover:to-[#8B0000] transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-[#8B0000]/20'
                }`}
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <span>Pay ₹{totalAmount}</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </>
                )}
              </button>

              {/* Security Badge */}
              <div className="flex items-center justify-center space-x-2 text-gray-400 text-sm mt-6">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>256-bit SSL Secure Payment</span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-gray-900/50 to-black rounded-2xl overflow-hidden border border-gray-800 shadow-2xl sticky top-24">
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-[#8B0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Order Summary
              </h3>
            </div>

            <div className="p-6 space-y-4">
              {/* Cart Items */}
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-800">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-10 h-10 object-cover" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{item.name}</p>
                      <p className="text-gray-400 text-xs">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-white font-medium">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}

              {/* Pricing Breakdown */}
              <div className="space-y-3 pt-4 border-t border-gray-800">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span>₹{shippingFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-white pt-3 border-t border-gray-800">
                  <span>Total Amount</span>
                  <span className="text-[#8B0000]">₹{totalAmount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;