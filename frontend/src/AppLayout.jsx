import AppHeader from "@components/AppHeader.jsx";
import { Outlet, useLocation } from "react-router-dom";

function AppLayout() {
  const location = useLocation();
  // List of routes where header should be hidden
  const hideHeaderRoutes = ["/", "/unauthorized"];
  const showHeader = !hideHeaderRoutes.includes(location.pathname);
  return (
    <>
      {showHeader && <AppHeader />}
      <Outlet />
    </>
  );
}

export default AppLayout;
