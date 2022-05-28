import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ isLoggedIn }) => {
  let token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/auth" />;
};

export default PrivateRoute;
