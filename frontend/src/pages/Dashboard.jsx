import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../core/context/authContext';
import "./css/dashboard.css"; // lo crearemos luego
import "./css/general.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <main id="dashboard">
      <h1>Bienvenido, {user.name || "usuario"} 👋</h1>
      <p>Rol: <strong>{user.role === "teacher" ? "Profesor" : "Alumno"}</strong></p>

      <div className="dashboard-buttons">
        {user.role === "teacher" ? (
          <>
            <button onClick={() => { navigate('/myGames') }}>🎮 Mis juegos</button>
            <button onClick={() => { navigate('/newGame') }}>➕ Crear nuevo juego</button>
            <button onClick={() => { navigate('/profile/teacher') }}>👤 Perfil</button>
          </>
        ) : (
          <>
            <button onClick={() => { navigate('/game') }}>🧩 Practicar</button>
            <button onClick={() => { navigate('/profile/student') }}>👤 Perfil</button>
          </>
        )}
      </div>

    </main>
  );
};

export default Dashboard;
