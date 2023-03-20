import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import Header from "pages/IsAuthRoute/Components/Header/Header";

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
