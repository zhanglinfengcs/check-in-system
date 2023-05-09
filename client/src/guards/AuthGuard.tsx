import { useLocation, Outlet, Navigate } from "react-router-dom";
import { IsStaff } from "../types";
import useUser from "../hooks/useUser";

const AuthGuard: React.FC = () => {
  const { user } = useUser();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace={true} />;
  }

  if (location.pathname.includes("/admin")) {
    if (user.isStaff === IsStaff.No) {
      return <Outlet />;
    } else {
      return <Navigate to="login" state={{ from: location }} replace={true} />;
    }
  }

  if (!location.pathname.includes("/admin")) {
    if (user.isStaff === IsStaff.Yes) {
      return <Outlet />;
    } else {
      return <Navigate to="login" state={{ from: location }} replace={true} />;
    }
  }

  return <Outlet />;
};

export default AuthGuard;
