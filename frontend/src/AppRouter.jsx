import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Páginas existentes
import AppLayout from "./AppLayout.jsx";
import Dashboard from './pages/Dashboard.jsx';
import Game from "./pages/Game.jsx";
import Login from "./pages/Login.jsx";
import Menu from "./pages/Menu.jsx";
import NewGame from './pages/NewGame.jsx';
import ProfileStudent from "./pages/ProfileStudent.jsx";
import ProfileTeacher from "./pages/ProfileTeacher.jsx";
import Registro from "./pages/Registro.jsx";
import Results from "./pages/Results.jsx";

import NotFoundPage from "./pages/NotFoundPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "game", element: <Game /> },
      { path: "registro", element: <Registro /> },
      { path: "profile/student", element: <ProfileStudent /> },
      { path: "profile/teacher", element: <ProfileTeacher /> },
      { path: "menu", element: <Menu /> },
      { path: "results", element: <Results /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "newGame", element: <NewGame /> },
      { path: "*", element: <NotFoundPage /> },
    ]
  },
]);

const AppRouter = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
export default AppRouter;
