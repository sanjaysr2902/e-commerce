// src/pages/LearnMore.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function LearnMore() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      <div className="max-w-4xl mx-auto p-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-red-500">
          About Sarax Car Accessories
        </h1>

        <p className="text-lg mb-4 text-white leading-relaxed">
          At <span className="font-semibold text-red-500">Sarax</span>, we provide premium car accessories that combine functionality and style. 
          Our products are designed to enhance your driving experience and elevate the look of your car.
        </p>

        <p className="text-lg mb-4 text-white leading-relaxed">
          From high-quality seat covers to advanced tech gadgets, we ensure every product meets the highest standards of quality, durability, and aesthetics.
        </p>

        <p className="text-lg mb-6 text-white leading-relaxed">
          Explore our wide range of accessories and upgrade your ride today. 
          We are committed to fast shipping and excellent customer support.
        </p>

        <Link
          to="/products"
          className="inline-block px-8 py-4 bg-red-600 text-white rounded-xl font-semibold text-lg hover:bg-red-700 transition"
        >
          View Products
        </Link>
      </div>
    </div>
  );
}
