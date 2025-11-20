// Layout.jsx
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./context/authContext";
import AppHeader from "./components/AppHeader.jsx"; // Your header component
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

