import { createBrowserRouter } from "react-router-dom";

import NotFound from "Components/NotFound/NotFound";

import UnAuthRoute from "pages/UnAuthRoute/UnAuthRoute";
import Login from "pages/UnAuthRoute/Components/Login/Login";
import Signup from "pages/UnAuthRoute/Components/Signup/Signup";
import Password from "pages/UnAuthRoute/Components/Password";

import IsAuthRoute from "pages/IsAuthRoute/IsAuthRoute";
import MainView from "pages/IsAuthRoute/Components/MainView/MainView";
import SearchView from "pages/IsAuthRoute/Components/SearchView/SearchView";

// session or local Storage 에 저장된 유저 정보에 따라 Route변경
const Router = createBrowserRouter([
  {
    path: "/",
    element: <UnAuthRoute />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/signup/password", element: <Password /> },
    ],
  },
  {
    path: "/browse",
    element: <IsAuthRoute />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <MainView /> },
      { path: "/browse/movies/:id", element: <MainView /> },
      { path: "search", element: <SearchView /> },
    ],
  },
]);

export default Router;
