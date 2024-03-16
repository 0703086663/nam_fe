import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom"; // Import useNavigate
import AuthContext from "./AuthContext";

const AuthGuard = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />; // Redirect to login on unauthorized access
  }

  return <>{children}</>; // Render wrapped component if authorized
};

export default AuthGuard;
