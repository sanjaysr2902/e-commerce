import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    const filteredUser = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      role: userData.role,          // ✅ store role for clarity
      isAdmin: userData.role === "admin",
    };

    setUser(filteredUser);
    localStorage.setItem("user", JSON.stringify(filteredUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
