import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Api from "../auth/api"; // API call to fetch the product details
import { CartContext } from "../context/Cartcontext"; // Import CartContext
import { WishlistContext } from "../context/Wishlistcontext"; // Import WishlistContext

export default function ProductDetailsPage() {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Access Cart and Wishlist context
  const { addToCart } = useContext(CartContext); 
  const { addToWishlist } = useContext(WishlistContext); 

  // Fetch the product from the API using the product ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await Api.get(`/products/${id}`); // Fetch single product by ID
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // Fetch the product whenever the ID changes

  if (loading) {
    return (
      <p className="text-center py-10 text-white bg-black h-screen">
        Loading product details...
      </p>
    );
  }

  return (
    <section className="bg-black text-white py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {product ? (
          <>
            <h1 className="text-4xl font-bold text-center mb-6">{product.name}</h1>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-contain mb-6"
            />
            <p className="text-lg mb-4">{product.description}</p>
            <p className="text-xl text-blue-400 font-bold mb-6">${product.price}</p>

            {/* Add to Cart Button */}
            <button
              onClick={() => addToCart(product)} // Add product to cart
              className="w-full bg-black/30 border border-gray-700 text-white py-2 rounded-lg hover:bg-black/60 transition mb-2"
            >
              Add to Cart
            </button>

            {/* Add to Wishlist Button */}
            <button
              onClick={() => addToWishlist(product)} // Add product to wishlist
              className="w-full bg-black/30 border border-gray-700 text-white py-2 rounded-lg hover:bg-black/60 transition"
            >
              Add to Wishlist
            </button>
          </>
        ) : (
          <p>Product not found</p>
        )}
      </div>
    </section>
  );
}
