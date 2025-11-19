import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

// Páginas existentes
import Game from "./pages/Game.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Menu from "./pages/Menu.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import Registro from "./pages/Registro.jsx";
import Results from "./pages/Results.jsx";
import Welcome from "./pages/Welcome.jsx";

// Nuevos perfiles
import ProfileStudent from "./pages/ProfileStudent.jsx";
import ProfileTeacher from "./pages/ProfileTeacher.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Welcome /> },
  { path: "/login", element: <Login /> },
  { path: "/home", element: <Home /> },
  { path: "/menu", element: <Menu /> },
  { path: "/game", element: <Game /> },
  { path: "/results", element: <Results /> },
  { path: "/registro", element: <Registro /> },
  
  // Rutas de perfiles
  { path: "/profile/student", element: <ProfileStudent /> },
  { path: "/profile/teacher", element: <ProfileTeacher /> },

  { path: "*", element: <NotFoundPage /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);