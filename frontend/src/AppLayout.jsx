import AppHeader from "@components/AppHeader.jsx";
import { Outlet } from "react-router-dom";

function AppLayout() {
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
