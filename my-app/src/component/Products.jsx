import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom"; // ✅ new import
import Api from "../auth/api";
import Navbar from "./Navbar";
import { CartContext } from "../context/Cartcontext";
import { WishlistContext } from "../context/Wishlistcontext";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

  // ✅ Read search query from URL
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search")?.toLowerCase() || "";

  // ✅ Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await Api.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ Filter products based on search term
  const filteredProducts = searchTerm
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm)
      )
    : products;

  if (loading) {
    return (
      <p className="text-center py-10 text-white bg-black h-screen">
        Loading products...
      </p>
    );
  }

  return (
    <>
      <Navbar />
      <section className="bg-black min-h-screen text-white py-12 px-6">
        <h1 className="text-4xl font-bold text-center mb-10 text-red-700 drop-shadow-[0_2px_6px_rgba(139,0,0,0.8)]">
          Car Accessories
        </h1>

        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-400 text-xl">
            No products found for "<span className="italic">{searchTerm}</span>"
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-gray-900 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-contain p-4 bg-gray-800"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2 text-white">
                    {product.name}
                  </h2>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-3">
                    {product.description}
                  </p>
                  <p className="text-blue-400 font-bold mb-3">
                    ${product.price}
                  </p>

                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-black/30 border border-gray-700 text-white py-2 rounded-lg hover:bg-black/60 transition mb-2"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={() => addToWishlist(product)}
                    className="w-full bg-black/30 border border-gray-700 text-white py-2 rounded-lg hover:bg-black/60 transition"
                  >
                    Add to Wishlist
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
