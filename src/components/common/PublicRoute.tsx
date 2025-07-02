import { Navigate } from "react-router-dom";
import { isTokenValid } from "../../utils/AuthUtil";
import { JSX } from "react";

const PublicRoute = ({ element }: { element: JSX.Element }) => {
  return isTokenValid() ? <Navigate to="/" replace /> : element;
};

export default PublicRoute;
