// src/pages/Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "./api";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if user already exists
      const res = await Api.get(`/users?email=${formData.email}`);
      if (res.data.length > 0) {
        alert("User already exists!");
        return;
      }

      // Register new user
      await Api.post("/users", {
        ...formData,
        cart: [],
        wishlist: [],
        orders: []
      });

      alert("Registration successful!");
      navigate("/login", {replace:true});
    } catch (err) {
      console.error("Error registering:", err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Register</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-gray-800 text-white"
          required
        />

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
          Register
        </button>
      </form>
    </div>
  );
}




























// import React, { useState } from "react";
// import axios from "axios";

// export default function RegisterPage() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [message, setMessage] = useState("");

//   // Handle input change
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Handle form submit
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     axios
//       .post("http://localhost:5000/users", formData) 
//       .then(() => {
//         setMessage("✅ User registered successfully!");
//         setFormData({ name: "", email: "", password: "" }); 
//       })
//       .catch((err) => {
//         console.error("Error registering user:", err);
//         setMessage("❌ Failed to register user.");
//       });
//   };

//   return (
//     <section className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
//         <h1 className="text-2xl font-bold text-center mb-6">Register</h1>

//         {message && (
//           <p className="text-center mb-4 text-sm text-green-600">{message}</p>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block mb-1 font-medium">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-medium">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-medium">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
//           >
//             Register
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// }

















// import { Link } from "react-router-dom";

// export default function Register() {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white shadow-lg rounded-2xl p-8 w-96">
//         <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
//         <form className="space-y-4">
//           <input
//             type="text"
//             placeholder="Username"
//             className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
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
//             className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition"
//           >
//             Register
//           </button>
//         </form>
//         <p className="text-sm text-center mt-4">
//           Already have an account?{" "}
//           <Link to="/login" className="text-green-600 hover:underline">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }
