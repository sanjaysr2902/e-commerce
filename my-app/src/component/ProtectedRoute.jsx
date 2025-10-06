


// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  // If user is null but localStorage has a user, it will be set by AuthContext
  if (user === null) return null; // wait until AuthContext loads

  return user ? children : <Navigate to="/login" />;
}
