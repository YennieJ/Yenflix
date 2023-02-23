import Home from "pages/IsAuthRoute/Components/Home";
import Search from "pages/IsAuthRoute/Components/Search";
import IsAuthRoute from "pages/IsAuthRoute/IsAuthRoute";
import Login from "pages/UnAuthRoute/Components/Login";
import Password from "pages/UnAuthRoute/Components/Password";
import Signup from "pages/UnAuthRoute/Components/Signup";
import UnAuthRoute from "pages/UnAuthRoute/UnAuthRoute";
import { createBrowserRouter } from "react-router-dom";

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
      { index: true, element: <Home /> },
      { path: "/browse/movies/:id", element: <Home /> },
      { path: "search", element: <Search /> },
    ],
  },
]);

export default Router;
