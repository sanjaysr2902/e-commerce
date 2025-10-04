// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useShippingContext } from "../context/ShippingContext";

// const ShippingPage = () => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     address: "",
//     city: "",
//     postalCode: "",
//     phone: "",
//   });

//   const navigate = useNavigate();
//   const { updateShippingDetails } = useShippingContext();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const totalAmount = 2500; // Example: You can replace with actual calculation
//     updateShippingDetails(formData, totalAmount);
//     navigate("/payment");
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
//       <h2 className="text-2xl font-bold mb-4 text-center text-indigo-700">
//         Shipping Details
//       </h2>

//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <input
//           type="text"
//           name="fullName"
//           placeholder="Full Name"
//           onChange={handleChange}
//           required
//           className="border p-2 rounded"
//         />
//         <input
//           type="text"
//           name="address"
//           placeholder="Address"
//           onChange={handleChange}
//           required
//           className="border p-2 rounded"
//         />
//         <input
//           type="text"
//           name="city"
//           placeholder="City"
//           onChange={handleChange}
//           required
//           className="border p-2 rounded"
//         />
//         <input
//           type="text"
//           name="postalCode"
//           placeholder="Postal Code"
//           onChange={handleChange}
//           required
//           className="border p-2 rounded"
//         />
//         <input
//           type="text"
//           name="phone"
//           placeholder="Phone Number"
//           onChange={handleChange}
//           required
//           className="border p-2 rounded"
//         />

//         <button
//           type="submit"
//           className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
//         >
//           Continue to Payment
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ShippingPage;











import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useShippingContext } from "../context/ShippingContext";
import { CartContext } from "../context/Cartcontext";
import { toast } from "react-toastify";

const ShippingPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const navigate = useNavigate();
  const { updateShippingDetails } = useShippingContext();
  const { cart } = useContext(CartContext); // ✅ get cart from CartContext

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cart || cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    const totalAmount = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    updateShippingDetails(formData, totalAmount);
    navigate("/payment");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-indigo-700">
        Shipping Details
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {["fullName","address","city","postalCode","phone"].map(field => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field === "fullName" ? "Full Name" : field === "postalCode" ? "Postal Code" : field === "phone" ? "Phone Number" : field.charAt(0).toUpperCase() + field.slice(1)}
            onChange={handleChange}
            required
            className="border p-2 rounded"
          />
        ))}
        <button type="submit" className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">
          Continue to Payment
        </button>
      </form>
    </div>
  );
};

export default ShippingPage;
