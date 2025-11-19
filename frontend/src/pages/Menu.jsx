import { Link } from "react-router-dom";
import { useState } from "react";
import "./css/general.css";
import "./css/menu.css";

const Menu = () => {
  const [tab, setTab] = useState("juegos");

  return (
    <main id="menu">
      <Link to="/home">
        <a>🏠️</a>
      </Link>

      <h1>Menú</h1>

      <nav className="tabs">
        <a onClick={() => setTab("juegos")} className={tab === "juegos" ? "active" : ""}>Juegos</a>
        <a onClick={() => setTab("ranking")} className={tab === "ranking" ? "active" : ""}>Ranking General</a>
        <a onClick={() => setTab("progreso")} className={tab === "progreso" ? "active" : ""}>Ejercicios en Progreso</a>
      </nav>

      <section className="tab-content">
        {tab === "juegos" && (
          <div>
            <p>Tipo de ejercicios (sumas, restas, fracciones...)</p>
            <Link to="/game">
              <a className="btn">Ir al juego</a>
            </Link>
          </div>
        )}
        {tab === "ranking" && <p>Ranking de jugadores con sus puntuaciones.</p>}
        {tab === "progreso" && <p>Ejercicios que has dejado a medias o en curso.</p>}
      </section>
    </main>
  );
};

export default Menu;