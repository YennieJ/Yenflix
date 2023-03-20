import { createBrowserRouter } from "react-router-dom";

import UnAuthRoute from "pages/UnAuthRoute/UnAuthRoute";
import Login from "pages/UnAuthRoute/Components/Login";
import Signup from "pages/UnAuthRoute/Components/Signup";
import Password from "pages/UnAuthRoute/Components/Password";

import IsAuthRoute from "pages/IsAuthRoute/IsAuthRoute";
import MainView from "pages/IsAuthRoute/Components/MainView/MainView";
import Search from "pages/IsAuthRoute/Components/Search";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <UnAuthRoute />,
    // errorElement: <NotFound />,
    children: [
      { index: true, element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/signup/password", element: <Password /> },
    ],
  },
  {
    path: "/browse",
    element: <IsAuthRoute />,
    // errorElement: <NotFound />,
    children: [
      { index: true, element: <MainView /> },
      { path: "/browse/movies/:id", element: <MainView /> },
      // { path: "search", element: <Search /> },
    ],
  },
]);

export default Router;
