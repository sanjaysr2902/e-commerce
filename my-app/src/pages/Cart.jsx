import React, { useContext } from "react";
import { CartContext } from "../context/Cartcontext";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {useSelector} from "react-redux"

export default function Cart() {
  const { cart, removeFromCart, addToCart, decrementQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const handleRemove = (id, name) => {
    removeFromCart(id);
    toast.info(`${name} removed from cart`);
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    navigate("/shipping", { state: { cart, totalAmount: total } });
  };
  const product=useSelector((state)=>state)
  console.log(product)

  return (
    <>
    <p></p>
      <Navbar />
      
      <div className="min-h-screen bg-black p-6 pt-24">
        <div className="max-w-6xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-12">
            <div className="relative inline-block">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Your
                </span>
                <br />
                <span className="text-[#8B0000] drop-shadow-[0_4px_12px_rgba(139,0,0,0.6)]">
                  Shopping Cart
                </span>
              </h1>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#8B0000] to-transparent"></div>
            </div>
          </div>

          {/* Cart Content */}
          {cart.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 text-[#8B0000] opacity-50">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p className="text-gray-400 text-xl mb-4">Your cart is empty</p>
              <Link
                to="/products"
                className="inline-block bg-gradient-to-r from-[#8B0000] to-[#A00000] text-white px-8 py-3 rounded-xl font-semibold hover:from-[#A00000] hover:to-[#8B0000] transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {cart.map((item, index) => (
                  <div
                    key={item.id}
                    className="group relative bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-gray-800 hover:border-[#8B0000]/50 transition-all duration-500 transform hover:-translate-y-1"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: 'fadeInUp 0.6s ease-out forwards'
                    }}
                  >
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row items-center gap-6">
                        {/* Product Image */}
                        <div className="relative">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 md:w-32 md:h-32 object-contain bg-gray-800 rounded-xl p-4 group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute -top-2 -right-2 bg-[#8B0000] text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                            {item.quantity}
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 text-center md:text-left">
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#8B0000] transition-colors duration-300">
                            {item.name}
                          </h3>
                          <p className="text-2xl font-bold text-[#8B0000] mb-4">
                            ${item.price}
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                            <button
                              onClick={() => decrementQuantity(item.id)}
                              className="w-10 h-10 flex items-center justify-center bg-gray-800 border border-gray-700 text-white rounded-lg hover:bg-[#8B0000] hover:border-[#8B0000] transform hover:scale-110 transition-all duration-300"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
                              </svg>
                            </button>
                            
                            <span className="text-white font-semibold text-lg min-w-8">
                              {item.quantity}
                            </span>
                            
                            <button
                              onClick={() => addToCart(item)}
                              className="w-10 h-10 flex items-center justify-center bg-gray-800 border border-gray-700 text-white rounded-lg hover:bg-[#8B0000] hover:border-[#8B0000] transform hover:scale-110 transition-all duration-300"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemove(item.id, item.name)}
                          className="w-12 h-12 flex items-center justify-center bg-gray-800 border border-gray-700 text-white rounded-xl hover:bg-red-600 hover:border-red-600 transform hover:scale-110 transition-all duration-300 group"
                        >
                          <svg 
                            className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="mt-4 pt-4 border-t border-gray-800 flex justify-between items-center">
                        <span className="text-gray-400">Item Total:</span>
                        <span className="text-xl font-bold text-white">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Shine Effect */}
                    <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-10 group-hover:animate-shine"></div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-gray-800 p-6 sticky top-24">
                  <h2 className="text-2xl font-bold text-white mb-6 text-center">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-300">
                      <span>Subtotal</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Shipping</span>
                      <span className="text-[#8B0000]">Free</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Tax</span>
                      <span>${(total * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-700 pt-4">
                      <div className="flex justify-between text-xl font-bold text-white">
                        <span>Total</span>
                        <span className="text-[#8B0000]">${(total * 1.1).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-[#8B0000] to-[#A00000] text-white py-4 px-6 rounded-xl font-bold hover:from-[#A00000] hover:to-[#8B0000] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#8B0000]/20 text-lg"
                  >
                    Proceed to Checkout
                  </button>

                  <Link
                    to="/products"
                    className="w-full mt-4 border border-gray-700 text-white py-4 px-6 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 text-center block"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />

      {/* Custom Animations */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shine {
          0% {
            left: -100%;
          }
          100% {
            left: 200%;
          }
        }

        .animate-shine {
          animation: shine 1.5s ease-in-out;
        }
      `}</style>
    </>
  );
}