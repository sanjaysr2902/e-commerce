




import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Api from "./api";
import { toast } from "react-toastify";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Api.get(
        `/users?email=${formData.email}&password=${formData.password}`
      );

      if (res.data.length > 0) {
        login(res.data[0]); // Save logged-in user to context
        toast.success("Login successful!");
        navigate("/", { replace: true }); // Redirect after login
      } else {
        toast.warn("Invalid email or password!");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-950/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-96 border border-gray-700"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-sky-400 tracking-wide uppercase">
          Sarax Accessories
        </h2>
        <p className="text-center text-gray-400 mb-8 text-sm">
          Welcome back! Please log in to access your account.
        </p>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-sky-400 outline-none"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 mb-6 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-sky-400 outline-none"
          required
        />

        <button
          type="submit"
          className="w-full bg-sky-500 py-3 rounded-lg text-white font-semibold text-lg shadow-md hover:bg-sky-600 transition-transform transform hover:scale-[1.02]"
        >
          Login
        </button>

        <p className="text-center text-gray-400 text-sm mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-sky-400 cursor-pointer hover:underline"
          >
            Register here
          </span>
          <br />
             <span
            onClick={() => navigate("/")}
            className="text-sky-400 cursor-pointer hover:underline"
          >
            Guest login
          </span>
        </p>
      </form>
    </div>
  );
}
