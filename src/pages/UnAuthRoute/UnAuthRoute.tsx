import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const UnAuthRoute = () => {
  const user =
    sessionStorage.getItem("sessionToken") ||
    localStorage.getItem("localToken");
  return <div>{user ? <Navigate to="/browse" /> : <Outlet />}</div>;
};
export default UnAuthRoute;

// 기본: 로그인 페이지
