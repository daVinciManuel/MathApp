import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/general.css";
import "./css/menu.css";

const Menu = () => {
  const [tab, setTab] = useState("juegos");
  const navigate = useNavigate();

  const goToProfile = () => {
    const role = localStorage.getItem("role"); // recupera el rol guardado en login
    if (role === "teacher") {
      navigate("pfteacher");
    } else if (role === "student") {
      navigate("pfstudent");
    } else {
      alert("Rol no definido");
    }
  };

  return (
    <main id="menu">
      <Link to="/home">
        <button>🏠️</button>
      </Link>

      <h1>Menú</h1>

      {/* Botón para ir al perfil */}
      <button
        onClick={goToProfile}
        className="btn"
        style={{ marginBottom: "20px" }}
      >
        Mi perfil
      </button>

      <nav className="tabs">
        <a
          onClick={() => setTab("juegos")}
          className={tab === "juegos" ? "active" : ""}
        >
          Juegos
        </a>
        <a
          onClick={() => setTab("ranking")}
          className={tab === "ranking" ? "active" : ""}
        >
          Ranking General
        </a>
        <a
          onClick={() => setTab("progreso")}
          className={tab === "progreso" ? "active" : ""}
        >
          Ejercicios en Progreso
        </a>
        <a
          onClick={() => setTab("historial")}
          className={tab === "historial" ? "active" : ""}
        >
          Historial de Partidas
        </a>
      </nav>

      <section className="tab-content">
        {tab === "juegos" && (
          <div>
            <p>Tipo de ejercicios</p>
            <Link to="/game">
              <button className="btn">Ir al juego</button>
            </Link>
          </div>
        )}
        {tab === "ranking" && <p>Ranking de jugadores con sus puntuaciones.</p>}
        {tab === "progreso" && (
          <p>Ejercicios que has dejado a medias o en curso.</p>
        )}
      </section>

      {tab === "progreso" && <EjerciciosEnProgreso />}
      {tab === "historial" && <History />}
    </main>
  );
};

export default Menu;
