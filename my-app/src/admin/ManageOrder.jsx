import React, { useEffect, useState } from "react";
import Api from "../auth/api"; // Your axios instance
import { toast } from "react-toastify";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users and extract all orders
  const fetchOrders = async () => {
    try {
      const res = await Api.get("/users"); // Fetch all users

      // Flatten all orders into one array
      const allOrders = res.data.flatMap((user) =>
        (user.orders || []).map((order) => ({
          ...order,
          customerName: user.name,
          customerEmail: user.email,
          shipping: order.shipping || {},
        }))
      );

      setOrders(allOrders);
    } catch (err) {
      console.error("Error fetching orders:", err);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading)
    return <div className="p-6 text-center">Loading orders...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">All Customer Orders</h1>

      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Order ID</th>
              <th className="p-3 border">Customer Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Shipping Details</th>
              <th className="p-3 border">Items</th>
              <th className="p-3 border">Total</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.map((o) => (
                <tr key={o.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{o.id}</td>
                  <td className="p-3 font-medium">{o.customerName}</td>
                  <td className="p-3 text-gray-600">{o.customerEmail}</td>
                  <td className="p-3 text-sm text-gray-700">
                    <div>
                      <strong>Name:</strong> {o.shipping.fullName || "—"}
                    </div>
                    <div>
                      <strong>Address:</strong> {o.shipping.address || "—"}
                    </div>
                    <div>
                      <strong>City:</strong> {o.shipping.city || "—"}
                    </div>
                    <div>
                      <strong>Phone:</strong> {o.shipping.phone || "—"}
                    </div>
                  </td>

                  <td className="p-3">
                    {o.items?.map((item, idx) => (
                      <div key={idx} className="text-sm">
                        🛒 {item.name} × {item.quantity || 1} (${item.price})
                      </div>
                    ))}
                  </td>

                  <td className="p-3 font-semibold text-gray-800">
                    ₹{o.totalAmount?.toFixed(2) || "0.00"}
                  </td>

                  <td className="p-3 text-gray-600">
                    {o.date
                      ? new Date(o.date).toLocaleString()
                      : "Not Available"}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        o.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : o.status === "Confirmed"
                          ? "bg-blue-100 text-blue-700"
                          : o.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {o.status || "Pending"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="p-4 text-center text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
