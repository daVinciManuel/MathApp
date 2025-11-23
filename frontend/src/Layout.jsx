import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AppHeader from "./components/AppHeader.jsx";
import { useAuth } from "./core/context/authContext";
import Welcome from "./pages/Welcome.jsx";

function Layout() {
  const { user } = useAuth();
  const location = useLocation(); // Gives current path
  const navigate = useNavigate();
  // List of routes where header should be hidden
  const hideHeaderRoutes = ["/"];
  console.log(user)
  const showHeader = !hideHeaderRoutes.includes(location.pathname);
  if (user !== null && location.pathname === '/') {
    navigate('/dashboard')
  }
  return (
    <>
      {showHeader && <AppHeader navigate={navigate} user={user} currentPath={location.pathname} />}
      {location.pathname === '/' ? <Welcome navigate={navigate} /> : <></>}
      {/* The child route renders here */}
      <Outlet />
    </>
  );
}

export default Layout;

