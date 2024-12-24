import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/api/AuthContext";

const ProtectedLoginRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useContext(AuthContext);

  return user ? <Navigate to="/" replace /> : children;
};

export default ProtectedLoginRoute;
