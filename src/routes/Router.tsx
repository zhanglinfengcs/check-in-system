import { Navigate, useRoutes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.tsx";
import { Home, Leave, Posts, Account, NotFound, Login, Dashboard } from "../pages";
import AuthGuard from "../guards/AuthGuard.tsx";

const Router = () => {
  return useRoutes([
    {
      element: <AuthGuard />,
      children: [
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
            },
            {
              path: "account",
              element: <Account />,
            },
            {
              path: "admin",
              children: [
                { 
                  element: <Navigate to='dashboard'/>, 
                  index: true
                },
                { 
                  path: 'dashboard', 
                  element: <Dashboard />
                }
              ]
            }
          ],
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "*",
      element: <Navigate to="/404" />,
    },
    {
      path: "404",
      element: <NotFound />,
    },
  ]);
};

export default Router;
