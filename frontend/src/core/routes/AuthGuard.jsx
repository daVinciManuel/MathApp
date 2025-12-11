import Loading from "@components/Loading.jsx";
import { useAuth } from "@core/hooks/context";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthGuard() {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;
  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
}
