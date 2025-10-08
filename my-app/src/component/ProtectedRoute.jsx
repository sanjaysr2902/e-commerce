

// import { Navigate } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// export default function ProtectedRoute({ children }) {
//   const { user } = useContext(AuthContext);

//   if (user === null) return null; 
//   return user ? children : <Navigate to="/login" />;
// }



import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user } = useContext(AuthContext);

  // If not logged in → go to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If route requires admin but user is not admin → go home
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Otherwise allow access
  return children;
}
