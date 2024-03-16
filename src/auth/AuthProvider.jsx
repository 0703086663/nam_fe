import React, { createContext, useState, useEffect } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to handle user login
  const login = async (credentials) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      setCurrentUser(data.user);
      setIsAuthenticated(true);
      // Store authentication token securely (e.g., local storage with HttpOnly flag)
      localStorage.setItem("authToken", data.token);
    } catch (error) {
      console.error("Login error:", error);
      // Handle login errors gracefully (e.g., display error message)
    }
  };

  // Function to handle user logout
  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("authToken");
    // Send logout request to server if necessary (e.g., to invalidate tokens)
  };

  // Check for existing authentication on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      // Validate token on the server if necessary
      // Assuming a successful validation (replace with your validation logic)
      setCurrentUser({ username: "example" }); // Replace with actual user data
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
