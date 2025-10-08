
import React, { useEffect, useState } from "react";
import Api from "../auth/api"; // ✅ import your Api instance
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    // ✅ Use your Api instance to call endpoints without repeating baseURL
    Promise.all([Api.get("/users"), Api.get("/products")])
      .then(([usersRes, productsRes]) => {
        if (!mounted) return;
        setUsers(Array.isArray(usersRes.data) ? usersRes.data : []);
        setProducts(Array.isArray(productsRes.data) ? productsRes.data : []);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.message || "Failed to load data");
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  // --- Data preparation ---
  const rolesData = React.useMemo(() => {
    const map = {};
    users.forEach((u) => {
      const role = u.role || "user";
      map[role] = (map[role] || 0) + 1;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [users]);

  const productsByCategory = React.useMemo(() => {
    const map = {};
    products.forEach((p) => {
      const category = p.category || "Unknown";
      map[category] = (map[category] || 0) + 1;
    });
    return Object.entries(map).map(([category, count]) => ({ category, count }));
  }, [products]);

  const topProductsInCarts = React.useMemo(() => {
    const map = {};
    users.forEach((u) => {
      if (!Array.isArray(u.cart)) return;
      u.cart.forEach((item) => {
        const key = item.id || item.name;
        map[key] = map[key] || { id: item.id, name: item.name, quantity: 0, price: item.price || 0 };
        map[key].quantity += Number(item.quantity || 0);
      });
    });
    return Object.values(map)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 10);
  }, [users]);

  const revenueByProduct = React.useMemo(() => {
    const map = {};
    users.forEach((u) => {
      if (!Array.isArray(u.cart)) return;
      u.cart.forEach((item) => {
        const key = item.id || item.name;
        const price = Number(item.price || 0);
        map[key] = map[key] || { id: item.id, name: item.name, revenue: 0 };
        map[key].revenue += price * Number(item.quantity || 0);
      });
    });
    return Object.values(map)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10);
  }, [users]);

  const usersOverTime = React.useMemo(() => {
    const map = {};
    users.forEach((u) => {
      const date = u.createdAt ? new Date(u.createdAt).toISOString().slice(0, 10) : "unknown";
      map[date] = (map[date] || 0) + 1;
    });
    return Object.entries(map)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => (a.date > b.date ? 1 : -1));
  }, [users]);

  // --- UI ---
  if (loading)
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">Loading dashboard...</h2>
        <p className="text-sm text-muted-foreground">Fetching users & products</p>
      </div>
    );

  if (error)
    return (
      <div className="p-6 text-center text-red-600">
        <h2 className="text-xl font-semibold">Error</h2>
        <p>{error}</p>
      </div>
    );

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28CFF", "#FF6B6B"];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <div className="text-sm text-gray-600">
          Users: {users.length} • Products: {products.length}
        </div>
      </header>

      {/* Roles Pie */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-md p-4">
          <h3 className="font-semibold mb-2">Roles Breakdown</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie dataKey="value" data={rolesData} nameKey="name" outerRadius={70} label>
                {rolesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Products by category */}
        <div className="col-span-1 md:col-span-2 bg-white rounded-2xl shadow-md p-4">
          <h3 className="font-semibold mb-2">Products by Category</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={productsByCategory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Top Products + Revenue */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-md p-4">
          <h3 className="font-semibold mb-2">Top Products in Carts</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProductsInCarts} layout="vertical">
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" width={150} />
              <Tooltip />
              <Bar dataKey="quantity" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-4">
          <h3 className="font-semibold mb-2">Revenue Estimate by Product</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueByProduct}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#00C49F" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Users over time */}
      <section className="bg-white rounded-2xl shadow-md p-4">
        <h3 className="font-semibold mb-2">Users Over Time</h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={usersOverTime}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#FF6B6B" />
          </LineChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
}
