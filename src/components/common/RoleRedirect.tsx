import { Navigate } from "react-router-dom";
import { getUserRole, isTokenValid } from "../../utils/AuthUtil";

const RoleRedirect = () => {
  const valid = isTokenValid();
  const role = getUserRole();

  if (!valid || !role) return <Navigate to="/signin" replace />;

  if (role === "admin") return <Navigate to="/admin-dashboard" replace />;
  if (role === "employee")
    return <Navigate to="/employees-dashboard" replace />;

  return <Navigate to="/signin" replace />; // fallback
};

export default RoleRedirect;
