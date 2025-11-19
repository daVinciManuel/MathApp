import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Game from "./pages/Game.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Menu from "./pages/Menu.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import Registro from "./pages/Registro.jsx";
import Results from "./pages/Results.jsx";
import Welcome from "./pages/Welcome.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Welcome /> },
  { path: "/login", element: <Login /> },

  { path: "/home", element: <Home /> },
  { path: "/menu", element: <Menu /> },
  { path: "/game", element: <Game /> },
  { path: "/results", element: <Results /> },
  { path: "/registro", element: <Registro /> },
  // { path: '/home', element: <Home/>},
  // { path: '/profile', element: <Profile/>},
  { path: "*", element: <NotFoundPage /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
