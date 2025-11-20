import "./css/header.css";
import LogoutButton from "./LogoutButton";

function AppHeader({ navigate, user, currentPath }) {
  console.log(currentPath)
  return (
    <header className="app-header" style={gridContainer}>
      <img src="/img/logo.png" width='80px'
        onClick={() => navigate('/')}
      />
      {user ? (
        <>
          {currentPath !== '/profile/student' &&
            currentPath !== '/profile/teacher' && (
              <button onClick={() => navigate("/profile/student")}>Perfil</button>
            )}
          <div className="user-info">
            Usuario: <strong style={{ textTransform: 'capitalize' }}>{user.name} {user.lastname}</strong>
          </div>
          <LogoutButton />
        </>
      ) : (

        // si la ruta no es /login muestra el boton login
        currentPath !== '/login' &&
        <button onClick={() => navigate('/login')}>Iniciar sesi&oacute;n</button>
      )
      }
    </header>
  );
}

export default AppHeader;

const gridContainer = {
  display: "grid",
  gridTemplate: "1fr / 100px 1fr 100px",
  alignItems: "center"
}
