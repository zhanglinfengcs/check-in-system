import { Navigate, useRoutes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.tsx";
import {Home, Leave, Posts} from "../pages";

const Router = () => {
  return useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          element: <Navigate to="home" />,
          index: true,
        },
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "posts",
          element: <Posts />,
        },
        {
          path: "leave",
          element: <Leave />,
        }
      ],
    },
  ]);
};

export default Router;
