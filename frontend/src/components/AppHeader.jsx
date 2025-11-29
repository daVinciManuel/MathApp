import { useAuth } from "@core/context/authContext.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import "./css/header.css";
import LogoutButton from "./LogoutButton";

function AppHeader() {
  // get the actual path
  const location = useLocation();
  const currentPath = location.pathname;
  console.log(currentPath);
  // get the user info from context
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log(user);
  // styles...
  const gridContainer = {
    display: "grid",
    gap: "1rem",
    gridTemplate: !user
      ? "1fr / 100px 1fr 100px"
      : "1fr / 100px 1fr 100px 100px",
    alignItems: "center",
  };
  const perfilBtnPosition = {
    gridColumn: 3,
    gridRow: 1,
  };
  const logoutBtnPosition = {
    gridColumn: 4,
    gridRow: 1,
  };
  const userInfoPosition = {
    gridColumn: 2,
    gridRow: 1,
  };
  return (
    <header className="app-header" style={gridContainer}>
      <img src="/img/logo.png" width="80px" onClick={() => navigate("/")} />
      {user ? (
        <>
          {currentPath !== "pfstudent" && currentPath !== "pfteacher" && (
            <button
              onClick={() => navigate(`/profile/${user.role}`)}
              style={perfilBtnPosition}
            >
              Perfil
            </button>
          )}
          <div className="user-info" style={userInfoPosition}>
            Usuario:{" "}
            <strong style={{ textTransform: "capitalize" }}>
              {user.name} {user.lastname}
            </strong>
          </div>
          <LogoutButton position={logoutBtnPosition} />
        </>
      ) : (
        // si la ruta no es /login muestra el boton login
        currentPath !== "/login" && (
          <button onClick={() => navigate("/login")}>
            Iniciar sesi&oacute;n
          </button>
        )
      )}
    </header>
  );
}

export default AppHeader;
