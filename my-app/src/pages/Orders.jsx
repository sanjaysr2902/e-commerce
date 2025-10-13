import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Api from "../auth/api";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!user?.id) return;
        const res = await Api.get(`/users/${user.id}`);
        setOrders(res.data?.orders || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-16">
        <div className="text-center">
          <div className="w-16 h-16 border-2 border-[#8B0000] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Please login to view orders</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        {/* Premium Header */}
        <div className="max-w-6xl mx-auto text-center mb-12">
          <div className="relative inline-block">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                YOUR ORDERS
              </span>
            </h1>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-[#8B0000] to-transparent"></div>
          </div>
          <p className="text-gray-400 text-lg mt-6">
            {orders.length} Order{orders.length !== 1 ? 's' : ''} placed
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 text-gray-600">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p className="text-gray-400 text-xl mb-4 tracking-wide">NO ORDERS YET</p>
            <p className="text-gray-600 mb-8">Start shopping to see your orders here</p>
            <button
              onClick={() => navigate('/products')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#8B0000] to-[#A00000] text-white px-8 py-4 rounded-lg font-semibold hover:from-[#A00000] hover:to-[#8B0000] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#8B0000]/20"
            >
              Start Shopping
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-gradient-to-br from-gray-900/50 to-black rounded-2xl overflow-hidden border border-gray-800 hover:border-[#8B0000]/30 transition-all duration-500 shadow-2xl"
              >
                {/* Order Header */}
                <div className="bg-gradient-to-r from-[#8B0000]/20 to-[#A00000]/20 p-6 border-b border-gray-800">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                    <div>
                      <h3 className="text-xl font-bold text-white">Order #{order.id}</h3>
                      <p className="text-gray-400 text-sm mt-1">
                        Placed on {order.date ? new Date(order.date).toLocaleDateString() : "-"}
                      </p>
                    </div>
                    <div className="text-right mt-2 sm:mt-0">
                      <p className="text-white font-bold text-lg">₹{order.totalAmount || 0}</p>
                      <p className="text-green-400 text-sm">{order.status || "Confirmed"}</p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#8B0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Items ({order.items?.length || 0})
                  </h4>
                  
                  <div className="space-y-4">
                    {order.items?.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-3 border-b border-gray-800 last:border-b-0"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-14 h-14 object-cover"
                              />
                            ) : (
                              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            )}
                          </div>
                          <div>
                            <p className="text-white font-medium">{item.name || "Product"}</p>
                            <p className="text-gray-400 text-sm">Qty: {item.quantity || 1}</p>
                            <p className="text-gray-400 text-sm">₹{item.price || 0} each</p>
                          </div>
                        </div>
                        <p className="text-white font-bold">₹{((item.price || 0) * (item.quantity || 1)).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  {/* Shipping Address */}
                  {order.shipping && (
                    <div className="mt-6 pt-6 border-t border-gray-800">
                      <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5 text-[#8B0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Shipping Address
                      </h4>
                      <div className="text-gray-300">
                        <p>{order.shipping.fullName || "-"}</p>
                        <p>{order.shipping.address || "-"}</p>
                        <p>{order.shipping.city || "-"}, {order.shipping.postalCode || "-"}</p>
                        <p>Phone: {order.shipping.phone || "-"}</p>
                      </div>
                    </div>
                  )}

                  {/* Payment Information */}
                  <div className="mt-6 pt-6 border-t border-gray-800">
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-[#8B0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      Payment Information
                    </h4>
                    <div className="text-gray-300">
                      <p>Payment ID: {order.paymentId || "Not available"}</p>
                      <p>Status: <span className="text-green-400">Paid</span></p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}