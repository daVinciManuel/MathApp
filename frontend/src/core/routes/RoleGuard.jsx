import { useAuth } from "@core/hooks/context";
import { Navigate, Outlet } from "react-router-dom";

export default function RoleGuard({ allowedRoles }) {
  const { user } = useAuth();

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
