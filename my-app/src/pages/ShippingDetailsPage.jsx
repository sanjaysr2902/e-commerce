import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ShippingDetailsPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // You can implement additional validation here

    // If form is valid, navigate to payment or order summary
    setTimeout(() => {
      // Here we will simulate submission success and navigate to the payment page
      navigate("/payment"); // Adjust this if you have a different route for payment
    }, 2000);
  };

  return (
    <section className="bg-black text-white py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-red-500">Shipping Details</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-lg">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full p-3 mt-2 rounded-md bg-gray-800 text-white"
            />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-lg">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full p-3 mt-2 rounded-md bg-gray-800 text-white"
            />
          </div>

          {/* City */}
          <div>
            <label htmlFor="city" className="block text-lg">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              className="w-full p-3 mt-2 rounded-md bg-gray-800 text-white"
            />
          </div>

          {/* State */}
          <div>
            <label htmlFor="state" className="block text-lg">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="w-full p-3 mt-2 rounded-md bg-gray-800 text-white"
            />
          </div>

          {/* Postal Code */}
          <div>
            <label htmlFor="postalCode" className="block text-lg">Postal Code</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              required
              className="w-full p-3 mt-2 rounded-md bg-gray-800 text-white"
            />
          </div>

          {/* Country */}
          <div>
            <label htmlFor="country" className="block text-lg">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full p-3 mt-2 rounded-md bg-gray-800 text-white"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6 text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${
                isSubmitting ? "bg-gray-500" : "bg-red-500"
              } text-white py-2 px-6 rounded-lg font-bold hover:bg-red-400 transition`}
            >
              {isSubmitting ? "Processing..." : "Proceed to Payment"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
