import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Api from "../auth/api"; 
import { toast } from "react-toastify";

export default function PremiumShowcase() {
  const [premiumProducts, setPremiumProducts] = useState([]);

 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await Api.get("/products"); 
        
        setPremiumProducts(res.data.slice(0, 3));
      } catch (err) {
        toast.error("Failed to load premium products");
      }
    };
    fetchProducts();
  }, []);

  return (
    <section
      className="relative bg-fixed bg-center bg-cover py-20"
      style={{
        backgroundImage:
          "url('https://wallpaper-house.com/data/out/8/wallpaper2you_221635.jpg')",
      }}
    >
     
      <div className="absolute inset-0 bg-black/70"></div>

    
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Premium Collection
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-300 mb-12 max-w-2xl mx-auto"
        >
          Handpicked luxury products crafted with precision and passion for true
          automotive enthusiasts.
        </motion.p>

      
        <div className="grid md:grid-cols-3 gap-8">
          {premiumProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-500"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-[#8B0000] font-medium mb-4">
                  ₹{product.price}
                </p>
                <button className="px-6 py-2 bg-[#8B0000] hover:bg-[#A00000] text-white rounded-full font-medium tracking-wide transition-all duration-300">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>

       
        {premiumProducts.length === 0 && (
          <p className="text-gray-400 mt-10 text-sm">
            No premium products available.
          </p>
        )}
      </div>
    </section>
  );
}
