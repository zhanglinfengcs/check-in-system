import { Navigate, useRoutes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.tsx";
import {
  Home,
  Leave,
  Notices,
  Account,
  NotFound,
  Login,
  NoticeDetails,
} from "../pages/general";
import {
  Dashboard,
  LeaveApply,
  NoticesManage,
  WorkersManage,
} from "../pages/admin";
import AuthGuard from "../guards/AuthGuard.tsx";
import WorkerDetails from "../sections/worker/WorkerDetails.tsx";

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
              path: "notices",
              element: <Notices />,
            },
            {
              path: "leave",
              element: <Leave />,
            },
            {
              path: "account/:userId",
              element: <Account />,
            },
            {
              path: "notice/:noticeId",
              element: <NoticeDetails />,
            },
            {
              path: "admin",
              children: [
                {
                  element: <Navigate to="dashboard" />,
                  index: true,
                },
                {
                  path: "dashboard",
                  element: <Dashboard />,
                },
                {
                  path: "apply",
                  element: <LeaveApply />,
                },
                {
                  path: "notices",
                  element: <NoticesManage />,
                },
                {
                  path: "workers",
                  element: <WorkersManage />,
                },
                {
                  path: "worker/details/:userId",
                  element: <WorkerDetails />,
                }
              ],
            },
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
