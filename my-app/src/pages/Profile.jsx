import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/Cartcontext";
import { WishlistContext } from "../context/Wishlistcontext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center pt-16">
        <div className="text-center">
          <div className="w-16 h-16 border-2 border-[#8B0000] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg">Please login to view profile</p>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Premium Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <div className="relative inline-block">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              PROFILE
            </span>
          </h1>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-[#8B0000] to-transparent"></div>
        </div>
        <p className="text-gray-400 text-lg mt-6">Your exclusive account dashboard</p>
      </div>

      {/* Profile Card */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-gray-900/50 to-black rounded-2xl overflow-hidden border border-gray-800 hover:border-[#8B0000]/30 transition-all duration-500 shadow-2xl">
          
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-[#8B0000] to-[#A00000] p-8 text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center border-2 border-white/20">
              <span className="text-2xl font-bold text-white">
                {user.username?.charAt(0).toUpperCase()}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{user.username}</h2>
            <p className="text-white/80">Premium Member</p>
          </div>

          {/* Profile Details */}
          <div className="p-8">
            <div className="space-y-6">
              {/* User ID */}
              <div className="flex items-center justify-between py-4 border-b border-gray-800">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#8B0000]/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#8B0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">User ID</p>
                    <p className="text-white font-medium">{user.id}</p>
                  </div>
                </div>
              </div>

              {/* Username */}
              <div className="flex items-center justify-between py-4 border-b border-gray-800">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#8B0000]/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#8B0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Username</p>
                    <p className="text-white font-medium">{user.username}</p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center justify-between py-4 border-b border-gray-800">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#8B0000]/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#8B0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email Address</p>
                    <p className="text-white font-medium">{user.email}</p>
                  </div>
                </div>
              </div>

              {/* Member Since */}
              <div className="flex items-center justify-between py-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#8B0000]/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#8B0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Member Since</p>
                    <p className="text-white font-medium">Premium Account</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/products')}
                className="flex-1 bg-transparent border border-gray-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                Continue Shopping
              </button>
              
              <button
                onClick={handleLogout}
                className="flex-1 bg-gradient-to-r from-[#8B0000] to-[#A00000] text-white py-3 px-6 rounded-lg font-medium hover:from-[#A00000] hover:to-[#8B0000] transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:shadow-[#8B0000]/20"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* Orders Card */}
          <div className="bg-gradient-to-br from-gray-900/50 to-black rounded-xl border border-gray-800 p-6 text-center hover:border-[#8B0000]/30 transition-all duration-300">
            <div className="w-12 h-12 bg-[#8B0000]/20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-[#8B0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-2xl mb-1">{cart.length}</h3>
            <p className="text-gray-400 text-sm">Cart Items</p>
          </div>

          {/* Wishlist Card */}
          <div className="bg-gradient-to-br from-gray-900/50 to-black rounded-xl border border-gray-800 p-6 text-center hover:border-[#8B0000]/30 transition-all duration-300">
            <div className="w-12 h-12 bg-[#8B0000]/20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-[#8B0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-2xl mb-1">{wishlist.length}</h3>
            <p className="text-gray-400 text-sm">Wishlist Items</p>
          </div>

          {/* Member Card */}
          <div className="bg-gradient-to-br from-gray-900/50 to-black rounded-xl border border-gray-800 p-6 text-center hover:border-[#8B0000]/30 transition-all duration-300">
            <div className="w-12 h-12 bg-[#8B0000]/20 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-[#8B0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-white font-bold text-2xl mb-1">Premium</h3>
            <p className="text-gray-400 text-sm">Membership</p>
          </div>
        </div>
      </div>
    </div>
  );
}
