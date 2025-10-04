// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Api from "./api";

// export default function Register() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: ""
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Check if user already exists
//       const res = await Api.get(`/users?email=${formData.email}`);
//       if (res.data.length > 0) {
//         alert("User already exists!");
//         return;
//       }

//       // Register new user
//       await Api.post("/users", {
//         ...formData,
//         cart: [],
//         wishlist: [],
//         orders: []
//       });

//       alert("Registration successful!");
//       navigate("/login", {replace:true});
//     } catch (err) {
//       console.error("Error registering:", err);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-black">
//       <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-bold mb-6 text-center text-white">Register</h2>

//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           value={formData.name}
//           onChange={handleChange}
//           className="w-full p-3 mb-4 rounded bg-gray-800 text-white"
//           required
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           className="w-full p-3 mb-4 rounded bg-gray-800 text-white"
//           required
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           className="w-full p-3 mb-6 rounded bg-gray-800 text-white"
//           required
//         />

//         <button type="submit" className="w-full bg-blue-600 py-3 rounded-lg text-white font-semibold hover:bg-blue-700">
//           Register
//         </button>
//       </form>
//     </div>
//   );
// }






import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "./api";
import { toast } from "react-toastify";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Confirm password check
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Check if user already exists
      const res = await Api.get(`/users?email=${formData.email}`);
      if (res.data.length > 0) {
        toast.info("User already exists!");
        return;
      }

      // Register new user
      await Api.post("/users", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        cart: [],
        wishlist: [],
        orders: []
      });

      toast.success("Registration successful!");
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Error registering:", err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-950/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-96 border border-gray-700"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-sky-400 tracking-wide uppercase">
          CarX Accessories
        </h2>
        <p className="text-center text-gray-400 mb-8 text-sm">
          Create your account to explore premium car parts and accessories
        </p>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-sky-400 outline-none"
          required
        />

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
          className="w-full p-3 mb-4 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-sky-400 outline-none"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full p-3 mb-6 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-sky-400 outline-none"
          required
        />

        <button
          type="submit"
          className="w-full bg-sky-500 py-3 rounded-lg text-white font-semibold text-lg shadow-md hover:bg-sky-600 transition-transform transform hover:scale-[1.02]"
        >
          Register
        </button>

        <p className="text-center text-gray-400 text-sm mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-sky-400 cursor-pointer hover:underline"
          >
            Login here
          </span>
        </p>
      </form>
    </div>
  );
}
