// components/routes/PublicRoute.jsx
import { useAuth } from "@core/context/authContext.jsx";
import { Navigate, Outlet } from "react-router-dom";

export default function PublicRoute() {
  const { user } = useAuth();

  if (user) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
}
