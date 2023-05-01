import { useRef } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { Sidebar } from "../Components/Sidebar/Sidebar";

export const CheckAuth = () => {
  const login = useRef(false);
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  console.log('this is auth')

  if (isLoggedIn === "true") {
    login.current = true;
  }

  return login.current ? <Sidebar><Outlet /> </Sidebar>: <Navigate to="/login" replace />;
};
