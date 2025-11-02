import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // redirect after logout
  };

  return (
    
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between p-4 text-white">
      {/* Logo on the left */}
      <div className="flex items-center space-x-3">
        <img src="/logo.png" alt="Logo" className="h-10 w-10 object-contain" />
        <span className="text-xl font-bold text-red-500">Sarax</span>
      </div>

      {/* Nav links */}
      <ul className="flex space-x-6 items-center font-bold">
        <li>
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
        </li>
        <li>
          <Link to="/products" className="hover:text-gray-300">
            Products
          </Link>
        </li>
        <li>
          <Link to="/wishlist" className="hover:text-gray-300">
            Wishlist
          </Link>
        </li>
        <li>
          <Link to="/cart" className="hover:text-gray-300">
            Cart
          </Link>
        </li>

        {!user ? (
          <>
            <li>
              <Link to="/register" className="hover:text-gray-300">
                Register
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-gray-300">
                Login
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="text-gray-300">Hi, {user.username}</li>
            <li>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-400 transition"
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
