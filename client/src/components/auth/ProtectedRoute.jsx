import { Navigate, useLocation } from "react-router-dom";
import Loader from "../common/Loader";
import useAuth from "../../hooks/useAuth";

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const location = useLocation();
  const { isLoading, user } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (requireAdmin && user.role !== "admin") {
    return <Navigate to="/user-dashboard" replace />;
  }

  return children;
}
