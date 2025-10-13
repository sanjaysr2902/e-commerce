import React, { useEffect, useState } from "react";
import Api from "../auth/api";
import { toast } from "react-toastify";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [role, setRole] = useState("");

  // ✅ Fetch users from db.json
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await Api.get("/users");
        setUsers(res.data || []);
      } catch (err) {
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // ✅ Delete user
  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await Api.delete(`/users/${id}`);
      setUsers(users.filter((u) => u.id !== id));
      toast.info("User deleted");
    } catch {
      toast.error("Failed to delete user");
    }
  };

  // ✅ Update user role
  const updateUserRole = async (id) => {
    try {
      await Api.patch(`/users/${id}`, { role });
      setUsers(
        users.map((u) => (u.id === id ? { ...u, role } : u))
      );
      toast.success("Role updated");
      setEditingUser(null);
    } catch {
      toast.error("Failed to update role");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading users...</p>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Users</h1>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg p-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b hover:bg-gray-100">
                <td className="p-3">{u.id}</td>
                <td className="p-3">{u.name || "N/A"}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">
                  {editingUser === u.id ? (
                    <select
                      className="border rounded px-2 py-1"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  ) : (
                    <span
                      className={`px-2 py-1 rounded text-white ${
                        u.role === "admin" ? "bg-red-600" : "bg-green-600"
                      }`}
                    >
                      {u.role || "user"}
                    </span>
                  )}
                </td>
                <td className="p-3 text-center">
                  {editingUser === u.id ? (
                    <button
                      onClick={() => updateUserRole(u.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded mr-2"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingUser(u.id);
                        setRole(u.role || "user");
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => deleteUser(u.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
