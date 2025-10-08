import React, { useEffect, useState } from "react";
import Api from "../auth/api";
import { toast } from "react-toastify";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", image: "" });

  useEffect(() => {
    Api.get("/products")
      .then(res => setProducts(res.data))
      .catch(() => toast.error("Failed to load products"));
  }, []);

  const addProduct = async () => {
    try {
      await Api.post("/products", newProduct);
      toast.success("Product added!");
      setProducts([...products, newProduct]);
    } catch {
      toast.error("Failed to add product");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await Api.delete(`/products/${id}`);
      setProducts(products.filter(p => p.id !== id));
      toast.info("Product deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl mb-4">Manage Products</h1>
      <div className="mb-6">
        <input type="text" placeholder="Name" className="text-black px-2" 
               onChange={e => setNewProduct({...newProduct, name: e.target.value})}/>
        <input type="text" placeholder="Price" className="text-black px-2 mx-2"
               onChange={e => setNewProduct({...newProduct, price: e.target.value})}/>
        <input type="text" placeholder="Image URL" className="text-black px-2 mx-2"
               onChange={e => setNewProduct({...newProduct, image: e.target.value})}/>
        <button onClick={addProduct} className="bg-[#8B0000] px-4 py-2 rounded">Add</button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {products.map(p => (
          <div key={p.id} className="bg-gray-800 p-4 rounded">
            <img src={p.image} alt={p.name} className="w-full h-40 object-cover mb-2 rounded" />
            <h2 className="font-bold">{p.name}</h2>
            <p>₹{p.price}</p>
            <button onClick={() => deleteProduct(p.id)} className="mt-2 bg-red-600 px-4 py-2 rounded">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
