import React, { useEffect, useState } from "react";
import Api from "../auth/api";
import { toast } from "react-toastify";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await Api.get("/users");

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

  const stats = {
    total: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0),
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Loading Orders</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All Orders</h1>
        <p className="text-gray-600 mt-2">View all completed customer orders</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Total Orders</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-600">Total Revenue</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">₹{stats.totalRevenue.toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Details</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                    <div className="text-sm text-gray-500 mt-1">
                      {order.date ? new Date(order.date).toLocaleDateString() : "Date not available"}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                    <div className="text-sm text-gray-500">{order.customerEmail}</div>
                    {order.shipping && (
                      <div className="text-xs text-gray-600 mt-2">
                        <div>{order.shipping.fullName || "—"}</div>
                        <div>{order.shipping.address || "—"}</div>
                        <div>{order.shipping.city || "—"} {order.shipping.phone ? `• ${order.shipping.phone}` : ""}</div>
                      </div>
                    )}
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {order.items?.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <span className="text-gray-900 line-clamp-1">{item.name}</span>
                          <div className="flex items-center space-x-2 text-gray-600">
                            <span>×{item.quantity || 1}</span>
                            <span>₹{item.price}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="text-lg font-bold text-gray-900">₹{order.totalAmount?.toFixed(2) || "0.00"}</div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Completed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {orders.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
          </div>
        )}
      </div>
    </div>
  );
}










































































// import React, { useEffect, useState } from "react";
// import Api from "../auth/api";
// import { toast } from "react-toastify";

// export default function AdminOrders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const res = await Api.get("/users");

//       const allOrders = res.data.flatMap((user) =>
//         (user.orders || []).map((order) => ({
//           ...order,
//           customerName: user.name,
//           customerEmail: user.email,
//           shipping: order.shipping || {},
//         }))
//       );

//       setOrders(allOrders);
//     } catch (err) {
//       console.error("Error fetching orders:", err);
//       toast.error("Failed to fetch orders");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const filteredOrders = orders.filter(order => {
//     const matchesStatus = statusFilter === "all" || order.status === statusFilter;
//     const matchesSearch = order.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                          order.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          order.id?.toString().includes(searchTerm);
    
//     return matchesStatus && matchesSearch;
//   });

//   const stats = {
//     total: orders.length,
//     pending: orders.filter(o => o.status === "Pending").length,
//     confirmed: orders.filter(o => o.status === "Confirmed").length,
//     delivered: orders.filter(o => o.status === "Delivered").length,
//     totalRevenue: orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0)
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <h2 className="text-xl font-semibold text-gray-700">Loading Orders</h2>
//           <p className="text-gray-500">Fetching order data...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
   
//       <div className="mb-8">
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
//             <p className="text-gray-600 mt-2">Manage and track customer orders</p>
//           </div>
//           <div className="mt-4 lg:mt-0 text-sm text-gray-500">
//             {filteredOrders.length} of {orders.length} orders
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Total Orders</p>
//               <p className="text-3xl font-bold text-gray-900 mt-2">{stats.total}</p>
//             </div>
//             <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
//               <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//               </svg>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Pending</p>
//               <p className="text-3xl font-bold text-gray-900 mt-2">{stats.pending}</p>
//             </div>
//             <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
//               <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Confirmed</p>
//               <p className="text-3xl font-bold text-gray-900 mt-2">{stats.confirmed}</p>
//             </div>
//             <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
//               <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm font-medium text-gray-600">Total Revenue</p>
//               <p className="text-3xl font-bold text-gray-900 mt-2">₹{stats.totalRevenue.toFixed(2)}</p>
//             </div>
//             <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
//               <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
//               </svg>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Search Orders</label>
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search by order ID, name, or email..."
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
//             <select
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//             >
//               <option value="all">All Status</option>
//               <option value="Pending">Pending</option>
//               <option value="Confirmed">Confirmed</option>
//               <option value="Delivered">Delivered</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Details</th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
//                 <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredOrders.map((order) => (
//                 <tr key={order.id} className="hover:bg-gray-50 transition-colors">
//                   <td className="px-6 py-4">
//                     <div className="text-sm font-medium text-gray-900">#{order.id}</div>
//                     <div className="text-sm text-gray-500 mt-1">
//                       {order.date ? new Date(order.date).toLocaleDateString() : "Date not available"}
//                     </div>
//                     <div className="text-xs text-gray-400 mt-1">
//                       {order.date ? new Date(order.date).toLocaleTimeString() : ""}
//                     </div>
//                   </td>
                  
//                   <td className="px-6 py-4">
//                     <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
//                     <div className="text-sm text-gray-500">{order.customerEmail}</div>
//                     {order.shipping && (
//                       <div className="text-xs text-gray-600 mt-2">
//                         <div>{order.shipping.fullName || "—"}</div>
//                         <div>{order.shipping.address || "—"}</div>
//                         <div>{order.shipping.city || "—"} {order.shipping.phone ? `• ${order.shipping.phone}` : ""}</div>
//                       </div>
//                     )}
//                   </td>
                  
//                   <td className="px-6 py-4">
//                     <div className="space-y-1">
//                       {order.items?.map((item, idx) => (
//                         <div key={idx} className="flex items-center justify-between text-sm">
//                           <span className="text-gray-900 line-clamp-1">{item.name}</span>
//                           <div className="flex items-center space-x-2 text-gray-600">
//                             <span>×{item.quantity || 1}</span>
//                             <span>₹{item.price}</span>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </td>
                  
//                   <td className="px-6 py-4">
//                     <div className="text-lg font-bold text-gray-900">₹{order.totalAmount?.toFixed(2) || "0.00"}</div>
//                   </td>
                  
//                   <td className="px-6 py-4">
//                     <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
//                       order.status === "Delivered"
//                         ? "bg-green-100 text-green-800"
//                         : order.status === "Confirmed"
//                         ? "bg-blue-100 text-blue-800"
//                         : order.status === "Pending"
//                         ? "bg-yellow-100 text-yellow-800"
//                         : "bg-gray-100 text-gray-800"
//                     }`}>
//                       {order.status || "Pending"}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {filteredOrders.length === 0 && (
//           <div className="text-center py-12">
//             <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//               </svg>
//             </div>
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
//             <p className="text-gray-500">Try adjusting your search or filters</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }