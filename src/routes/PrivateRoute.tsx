import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/api/AuthContext";
// import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;