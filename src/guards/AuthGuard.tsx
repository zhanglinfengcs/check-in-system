import { useLocation, Outlet, Navigate } from "react-router-dom";
import useUser from "../hooks/useUser";

const AuthGuard: React.FC = () => {
  const { user } = useUser();
  const location = useLocation();
  return user ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace={true} />
  );
}

export default AuthGuard