import Header from "pages/IsAuthRoute/Components/Header";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const IsAuthRoute = () => {
  const user =
    sessionStorage.getItem("sessionToken") ||
    localStorage.getItem("localToken");

  return (
    <div>
      {user ? (
        <>
          <Header />
          <Outlet />
        </>
      ) : (
        <Navigate to="/" />
      )}
    </div>
  );
};

export default IsAuthRoute;
