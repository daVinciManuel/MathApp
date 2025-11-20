// Layout.jsx
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AppHeader from "./components/AppHeader.jsx"; // Your header component
import Welcome from "./pages/Welcome.jsx";

function Layout() {
  const location = useLocation(); // Gives current path
  const navigate = useNavigate();
  console.log(location)
  // List of routes where header should be hidden
  const hideHeaderRoutes = ["/game"];

  const showHeader = !hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {showHeader && <AppHeader navigate={navigate} />}
      {/* The child route renders here */}
      {location.pathname === '/' ? <Welcome /> : <></>}
      <Outlet />
    </>
  );
}

export default Layout;

