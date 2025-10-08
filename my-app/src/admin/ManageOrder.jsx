import { useState, useEffect } from "react";
import Api from "../auth/api"; // Your API axios instance
import { toast } from "react-toastify";

export default function ManageOrder() {
  const [orders, setOrders] = useState([]);

  // Fetch all orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await Api.get("/orders");
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        toast.error("Failed to fetch orders");
      }
    };

    fetchOrders();
  }, []);

  // Update order status
  const updateStatus = async (orderId, newStatus) => {
    try {
      await Api.patch(`/orders/${orderId}`, { status: newStatus });
      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      toast.success("Order status updated!");
    } catch (err) {
      console.error("Error updating order:", err);
      toast.error("Failed to update order");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Orders</h1>

      <div className="overflow-x-auto bg-white rounded shadow p-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-3">Order ID</th>
              <th className="py-2 px-3">User</th>
              <th className="py-2 px-3">Items</th>
              <th className="py-2 px-3">Amount</th>
              <th className="py-2 px-3">Status</th>
              <th className="py-2 px-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-3">{order.id}</td>
                <td className="py-2 px-3">{order.userName}</td>
                <td className="py-2 px-3">{order.items.length}</td>
                <td className="py-2 px-3">${order.total}</td>
                <td className="py-2 px-3">{order.status}</td>
                <td className="py-2 px-3 space-x-2">
                  <button
                    onClick={() => updateStatus(order.id, "Pending")}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                  >
                    Pending
                  </button>
                  <button
                    onClick={() => updateStatus(order.id, "Shipped")}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                  >
                    Shipped
                  </button>
                  <button
                    onClick={() => updateStatus(order.id, "Delivered")}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                  >
                    Delivered
                  </button>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
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
