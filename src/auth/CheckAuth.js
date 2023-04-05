import { useRef } from "react";
import { Outlet, Navigate } from "react-router-dom";

export const CheckAuth = () => {
  const login = useRef(false);
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  console.log('this is auth')

  if (isLoggedIn === "true") {
    login.current = true;
  }

  return login.current ? <Outlet /> : <Navigate to="/login" replace />;
};
