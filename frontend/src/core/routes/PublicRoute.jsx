// components/routes/PublicRoute.jsx
import { useAuth } from "@core/hooks/context";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
  const { user } = useAuth();

  if (user) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
}
