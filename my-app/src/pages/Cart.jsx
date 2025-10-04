
import React, { useContext } from "react";
import { CartContext } from "../context/Cartcontext"; // Assuming CartContext is properly set up
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom"; // useNavigate for redirection

export default function Cart() {
  const { cart, removeFromCart, addToCart, decrementQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  // Remove item from cart
  const handleRemove = (id, name) => {
    removeFromCart(id);
    toast.info(`${name} removed from cart`);
  };

  // Calculate total price of items in the cart
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Handle proceeding to checkout
  const handleCheckout = () => {
    navigate("/shipping", { state: { cart, totalAmount: total } });
  };

  return (
    <>
      {/* Navbar at the top */}
      <Navbar />

      {/* Main content with padding to avoid fixed navbar overlap */}
      <div className="min-h-screen bg-black p-6 pt-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-red-500">🛒 Your Cart</h1>

          {/* Display cart items */}
          {cart.length === 0 ? (
            <p className="text-gray-300 text-lg">Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-col md:flex-row items-center justify-between p-4 border border-gray-700 rounded-lg shadow-sm bg-gray-900"
                >
                  {/* Left: Image and Name */}
                  <div className="flex items-center gap-4 md:w-1/2">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <span className="text-white font-medium text-lg">{item.name}</span>
                  </div>

                  {/* Right: Price, Quantity and Remove */}
                  <div className="flex items-center gap-4 mt-4 md:mt-0">
                    <span className="text-white font-semibold">${item.price}</span>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decrementQuantity(item.id)} // Decrement quantity
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                      >
                        -
                      </button>
                      <span className="text-white">{item.quantity}</span> {/* Display quantity */}
                      <button
                        onClick={() => addToCart(item)} // Increment quantity
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                      >
                        +
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemove(item.id, item.name)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Cart Summary */}
          {cart.length > 0 && (
            <div className="mt-6 flex justify-between items-center text-white">
              <span className="text-xl font-bold">Total:</span>
              <span className="text-2xl text-red-500">${total.toFixed(2)}</span>
            </div>
          )}

          {/* Proceed to Checkout Button */}
          {cart.length > 0 && (
            <div className="mt-8 text-center">
              <button
                onClick={handleCheckout} // Use handleCheckout function for redirection
                className="bg-red-500 text-white py-2 px-6 rounded-lg font-bold hover:bg-red-400 transition"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer at bottom */}
      <Footer />
    </>
  );
}
