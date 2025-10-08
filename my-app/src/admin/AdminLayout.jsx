// import { Outlet, Link } from "react-router-dom";

// export default function AdminLayout() {
//   return (
//     <div>
//       <h2>Admin Panel</h2>
//       <nav>
//         <Link to="/admin">Dashboard</Link> |{" "}
//         <Link to="/admin/products">Products</Link> |{" "}
//         <Link to="/admin/users">Users</Link> |{" "}
//         <Link to="/admin/orders">Orders</Link>
//       </nav>
//       <hr />
//       <Outlet /> {/* Nested routes will render here */}
//     </div>
//   );
// }



import { Outlet, NavLink } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-gray-700">
          Admin Panel
        </div>
        <nav className="flex-1 flex flex-col p-4 space-y-2">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-gray-700 transition ${
                isActive ? "bg-gray-700 font-semibold" : ""
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-gray-700 transition ${
                isActive ? "bg-gray-700 font-semibold" : ""
              }`
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-gray-700 transition ${
                isActive ? "bg-gray-700 font-semibold" : ""
              }`
            }
          >
            Users
          </NavLink>
          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-gray-700 transition ${
                isActive ? "bg-gray-700 font-semibold" : ""
              }`
            }
          >
            Orders
          </NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-auto">
        <Outlet /> {/* Nested routes render here */}
      </main>
    </div>
  );
}
