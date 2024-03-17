import React, { createContext, useState, useEffect } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to handle user login
  const login = async (credentials) => {
    try {
      const response = await fetch("http://localhost:9999/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      if (data && data.data) {
        setCurrentUser({ email: data.data.email, name: data.data.name });
        setIsAuthenticated(true);
        localStorage.setItem(
          "authToken",
          JSON.stringify({
            email: data.data.email,
            name: data.data.name,
            token: data.data.token,
          })
        );
        return {
          email: data.data.email,
          name: data.data.name,
          token: data.data.token,
        };
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
  };

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      setCurrentUser({ email: authToken?.email, name: authToken?.name }); // Replace with actual user data
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
