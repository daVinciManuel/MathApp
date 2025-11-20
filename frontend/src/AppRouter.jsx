import { createBrowserRouter, RouterProvider } from "react-router-dom";
// Páginas existentes
import Game from "./pages/Game.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Menu from "./pages/Menu.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import Registro from "./pages/Registro.jsx";
import Results from "./pages/Results.jsx";
import Welcome from "./pages/Welcome.jsx";
import Layout from "./Layout.jsx";
import Dashboard from './pages/Dashboard.jsx';

// Nuevos perfiles
import ProfileStudent from "./pages/ProfileStudent.jsx";
import ProfileTeacher from "./pages/ProfileTeacher.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "game", element: <Game /> },
      { path: "registro", element: <Registro /> },
      { path: "profile/student", element: <ProfileStudent /> },
      { path: "profile/teacher", element: <ProfileTeacher /> },
      { path: "home", element: <Home /> },
      { path: "menu", element: <Menu /> },
      { path: "results", element: <Results /> },
      { path: "dashboard", element: <Dashboard /> },
    ]
  },

  // Rutas de perfiles

  { path: "*", element: <NotFoundPage /> },
]);

const AppRouter = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
export default AppRouter;
