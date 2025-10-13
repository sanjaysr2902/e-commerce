import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/Cartcontext";
import { WishlistContext } from "../context/Wishlistcontext";
import { useNavigate } from "react-router-dom";
import Api from "../auth/api";

export default function Profile() {
  const { user, logout, setUser } = useContext(AuthContext); // Assuming setUser available to update context
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const [orders, setOrders] = useState([]);
  const [editUsername, setEditUsername] = useState(false);
  const [newUsername, setNewUsername] = useState(user?.username || "");
  const navigate = useNavigate();

  // Fetch latest orders whenever user changes
  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const res = await Api.get(`/users/${user.id}`);
          setOrders(res.data.orders || []);
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetchOrders();
  }, [user]);

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

  const totalOrders = orders.length;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleUsernameUpdate = async () => {
    if (!newUsername.trim()) return;

    try {
      const res = await Api.patch(`/users/${user.id}`, { username: newUsername });
      setUser(res.data); // Update user in AuthContext
      setEditUsername(false);
    } catch (err) {
      console.error("Failed to update username:", err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          PROFILE
        </h1>
        <p className="text-gray-400 text-lg mt-2">Your exclusive account dashboard</p>
      </div>

      {/* Profile Card */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-gray-900/50 to-black rounded-2xl border border-gray-800 shadow-2xl overflow-hidden">
          
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-[#8B0000] to-[#A00000] p-8 text-center">
            <div className="w-24 h-24 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center border-2 border-white/20">
              <span className="text-3xl font-bold text-white">
                {user.username?.charAt(0).toUpperCase()}
              </span>
            </div>

            {/* Editable Username */}
            {editUsername ? (
              <div className="flex justify-center gap-2">
                <input
                  type="text"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="rounded px-2 py-1 text-black"
                />
                <button
                  onClick={handleUsernameUpdate}
                  className="bg-[#8B0000] px-3 py-1 rounded text-white hover:bg-[#A00000]"
                >
                  Save
                </button>
                <button
                  onClick={() => { setEditUsername(false); setNewUsername(user.username); }}
                  className="bg-gray-600 px-3 py-1 rounded text-white hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex justify-center items-center gap-2">
                <h2 className="text-2xl font-bold text-white mb-1">{user.username}</h2>
                <button
                  onClick={() => setEditUsername(true)}
                  className="text-sm text-gray-300 hover:text-white"
                >
                  Edit
                </button>
              </div>
            )}

            <p className="text-white/80">{user.role || "Member"}</p>
          </div>

          {/* Profile Details */}
          <div className="p-8 space-y-6">
            <ProfileRow label="User ID" value={user.id} icon="id" />
            <ProfileRow label="Email" value={user.email} icon="email" />
            {user.phone && <ProfileRow label="Phone" value={user.phone} icon="phone" />}
            {user.address && <ProfileRow label="Address" value={user.address} icon="location" />}

            {/* Orders */}
            <div className="flex items-center justify-between py-4 border-b border-gray-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#8B0000]/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#8B0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Orders</p>
                  <p className="text-white font-medium">{totalOrders}</p>
                </div>
              </div>
              {totalOrders > 0 && (
                <button
                  onClick={() => navigate("/orders")}
                  className="text-[#8B0000] hover:text-[#A00000] transition-colors duration-300 text-sm font-medium"
                >
                  View Orders
                </button>
              )}
            </div>

            {user.createdAt && (
              <ProfileRow
                label="Member Since"
                value={new Date(user.createdAt).toLocaleDateString()}
                icon="calendar"
              />
            )}

            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/products")}
                className="flex-1 bg-transparent border border-gray-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300"
              >
                Continue Shopping
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 bg-gradient-to-r from-[#8B0000] to-[#A00000] text-white py-3 px-6 rounded-lg font-medium hover:from-[#A00000] hover:to-[#8B0000] transform hover:scale-105 transition-all duration-300"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            <StatCard label="Cart Items" value={cart.length} />
            <StatCard label="Wishlist Items" value={wishlist.length} />
            <StatCard label="Total Orders" value={totalOrders} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable profile row component
const ProfileRow = ({ label, value, icon }) => {
  const icons = {
    id: <svg className="w-5 h-5 text-[#8B0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0" /></svg>,
    email: <svg className="w-5 h-5 text-[#8B0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    phone: <svg className="w-5 h-5 text-[#8B0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3l2 5-2 2 2 2 2-2 2 2 2-2 2 2 2-2 2 5h3a2 2 0 012 2v2a2 2 0 01-2 2h-3l-2-5 2-2-2-2-2 2-2-2-2 2-2-2-2 2-2-5H5a2 2 0 01-2-2V5z" /></svg>,
    location: <svg className="w-5 h-5 text-[#8B0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s8-4.5 8-10-3.582-8-8-8-8 3.582-8 8 8 10 8 10z"/></svg>,
    calendar: <svg className="w-5 h-5 text-[#8B0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>,
  };

  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-800">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-[#8B0000]/20 rounded-lg flex items-center justify-center">
          {icons[icon]}
        </div>
        <div>
          <p className="text-sm text-gray-400">{label}</p>
          <p className="text-white font-medium">{value}</p>
        </div>
      </div>
    </div>
  );
};

// Reusable stats card
const StatCard = ({ label, value }) => (
  <div className="bg-gradient-to-br from-gray-900/50 to-black rounded-xl border border-gray-800 p-6 text-center hover:border-[#8B0000]/30 transition-all duration-300">
    <h3 className="text-white font-bold text-2xl mb-1">{value}</h3>
    <p className="text-gray-400 text-sm">{label}</p>
  </div>
);
