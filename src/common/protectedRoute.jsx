import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import auth from "../services/authService";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  if (!auth.getCurrentUser()) {
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace
      />
    );
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;

