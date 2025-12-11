import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Contexto para la creación de nuevos juegos
import { NewGameProvider } from "@core/hooks/context";
// Páginas existentes
import AppLayout from "@/AppLayout.jsx";
import Dashboard from "@pages/protected/Dashboard.jsx";
import ProfileStudent from "@pages/protected/student/ProfileStudent.jsx";
import MyGames from "@pages/protected/teacher/MyGames.jsx";
import NewGame from "@pages/protected/teacher/NewGame.jsx";
import ProfileTeacher from "@pages/protected/teacher/ProfileTeacher.jsx";
import Unauthorized from "@pages/protected/Unauthorized.jsx";
import Game from "@pages/unprotected/Game.jsx";
import Login from "@pages/unprotected/Login.jsx";
import NotFoundPage from "@pages/unprotected/NotFoundPage.jsx";
import Registro from "@pages/unprotected/Registro.jsx";
import Results from "@pages/unprotected/Results.jsx";
import Welcome from "@pages/unprotected/Welcome.jsx";

import AuthGuard from "@core/routes/AuthGuard.jsx";
import PublicRoute from "@core/routes/PublicRoute.jsx";
import RoleGuard from "@core/routes/RoleGuard.jsx";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        element: <PublicRoute />,
        children: [
          { path: "/", element: <Welcome /> },
          { path: "login", element: <Login /> },
          { path: "registro", element: <Registro /> },
        ],
      },
      {
        element: <AuthGuard />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          // role-based routes
          {
            element: <RoleGuard allowedRoles={["teacher"]} />,
            children: [
              { path: "pfteacher", element: <ProfileTeacher /> },
              {
                path: "newGame",
                element: (
                  <NewGameProvider>
                    <NewGame />
                  </NewGameProvider>
                ),
              },
              { path: "myGames", element: <MyGames /> },
            ],
          },
          {
            element: <RoleGuard allowedRoles={["student"]} />,
            children: [{ path: "pfstudent", element: <ProfileStudent /> }],
          },
        ],
      },
      { path: "game", element: <Game /> },
      { path: "results", element: <Results /> },
      { path: "unauthorized", element: <Unauthorized /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

const AppRouter = () => <RouterProvider router={router} />;
export default AppRouter;
