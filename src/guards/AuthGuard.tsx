import { useLocation, Outlet, Navigate } from "react-router-dom";
import { UserLevel } from "../types";
import useUser from "../hooks/useUser";

const AuthGuard: React.FC = () => {
  const { user } = useUser();
  const location = useLocation();
  console.log('pass auth guard')
  console.log('pathname', location.pathname)

  if (!user) {
    return (
      <Navigate to='/login' state={{ from: location }} replace={true} />
    );
  }
  
  if (location.pathname.includes('/admin')) {
    if (user.level === UserLevel.Admin) {
      return (
        <Outlet />
      );
    } else {
      return (
         <Navigate to='login' state={{ from: location }} replace={true} />
      );
    }
  }

  if (!location.pathname.includes('/admin')) {
    if (user.level === UserLevel.Simple) {
      return (
        <Outlet />
      );
    } else {
      return (
         <Navigate to='login' state={{ from: location }} replace={true} />
      );
    }
  }

  return (
    <Outlet />
  )
}

export default AuthGuard