import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  const navigate = useNavigate();

  if (!token) {
    navigate("/");
  }

  return <div>{children}</div>;
};

export default ProtectedRoute;
