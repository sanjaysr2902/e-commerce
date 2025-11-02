// import { Link } from "react-router-dom";

// export default function Login() {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white shadow-lg rounded-2xl p-8 w-96">
//         <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
//         <form className="space-y-4">
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
//           >
//             Login
//           </button>
//         </form>
//         <p className="text-sm text-center mt-4">
//           Don’t have an account?{" "}
//           <Link to="/register" className="text-blue-600 hover:underline">
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }




import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Api from "./api";
import { toast } from 'react-toastify';


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
        login(res.data[0]); // Save logged in user to context
        toast.success("Login successful!");
        navigate("/", {replace:true}); // Redirect after login
      } else {
        toast.warn("Invalid email or password!");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-gray-800 text-white"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 mb-6 rounded bg-gray-800 text-white"
          required
        />

        <button type="submit" className="w-full bg-blue-600 py-3 rounded-lg text-white font-semibold hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
}
