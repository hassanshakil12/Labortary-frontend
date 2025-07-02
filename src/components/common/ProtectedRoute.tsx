// src/components/common/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { isTokenValid, getUserRole } from "../../utils/AuthUtil";

interface ProtectedRouteProps {
  allowedRoles?: string[];
  redirectTo?: string;
}

const ProtectedRoute = ({
  allowedRoles,
  redirectTo = "/signin",
}: ProtectedRouteProps) => {
  const valid = isTokenValid();
  const role = getUserRole();

  if (!valid) return <Navigate to={redirectTo} replace />;

  if (allowedRoles && !allowedRoles.includes(role!)) {
    return <Navigate to="/not-found" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
