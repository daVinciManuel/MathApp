import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./css/general.css";
import "./css/dashboard.css"; // lo crearemos luego

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", role: "" });

  useEffect(() => {
    // Leer datos guardados tras el login (ejemplo)
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      navigate("/login");
      return;
    }
    setUser(storedUser);
  }, [navigate]);

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
