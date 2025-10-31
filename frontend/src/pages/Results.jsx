/*import { Link } from "react-router-dom";
import "./css/general.css";
import "./css/results.css";

const Results = () => {
  return (
    <main id="results">
        <Link to="/home">
            <a>🏠️</a>
        </Link>
        <h1>Resultados</h1>

        <Link to="/menu">
            <a className="btn">Volver al menú</a>
        </Link>
    </main>
  );
};

export default Results;*/
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import "./css/general.css";
import "./css/results.css";

const Results = () => {
  const [isLogged, setIsLogged] = useState(false);
  const location = useLocation();
  const { accuracy = 0, duration = 0 } = location.state || {};

  // Determinar mensaje e imagen según el porcentaje
  let message = "";
  let image = "";

  if (accuracy >= 80) {
    message = "¡Excelente! 🎉";
    image = "/img/amazing.png";
  } else if (accuracy >= 50) {
    message = "¡Bien hecho! 👍";
    image = "/img/buen-trabajo.png";
  } else {
    message = "Sigue practicando 💪";
    image = "/img/puedes-mejorar.png";
  }

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/profile", { withCredentials: true })
      .then(() => {
        setIsLogged(true);
      })
      .catch(() => {
        setIsLogged(false);
      });
  }, []);

  return (
    <>
      <AppHeader />
      <main id="results">
        <img
          src={image}
          alt="Resultado"
          style={{ width: "150px", marginBottom: "15px" }}
        />
        <h2>{message}</h2>

        <div className="stats">
          <p>
            Precisión: <strong>{accuracy}%</strong>
          </p>
          <p>
            Duración: <strong>{duration}s</strong>
          </p>
        </div>

        <br />
        {isLogged ? (
          <Link to="/home">
            <button>Men&uacute; de Inicio</button>
          </Link>
        ) : (
          <Link to="/login">
            <button>Iniciar sesi&oacute;n</button>
          </Link>
        )}
      </main>
    </>
  );
};

export default Results;
