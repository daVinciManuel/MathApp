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
import { Link, useLocation } from "react-router-dom";
import "./css/general.css";
import "./css/results.css";

const Results = () => {
  const location = useLocation();
  const { accuracy = 0, duration = 0 } = location.state || {};

  // Determinar mensaje e imagen según el porcentaje
  let message = "";
  let image = "";

  if (accuracy >= 80) {
    message = "¡Excelente! 🎉";
    image = "https://i.imgur.com/y8q6zDL.png"; // por ejemplo: trofeo / check verde
  } else if (accuracy >= 50) {
    message = "¡Bien hecho! 👍";
    image = "https://i.imgur.com/ek0f4DM.png"; // carita sonriente
  } else {
    message = "Sigue practicando 💪";
    image = "https://i.imgur.com/RQFZtHz.png"; // carita triste o icono de mejora
  }

  return (
    <main id="results">
      <img
        src={image}
        alt="Resultado"
        style={{ width: "150px", marginBottom: "15px" }}
      />
      <h2>{message}</h2>

      <div className="stats">
        <p>Precisión: <strong>{accuracy}%</strong></p>
        <p>Duración: <strong>{duration}s</strong></p>
      </div>

      <Link
        to="/menu"
        style={{ position: "absolute", bottom: "20px", right: "20px" }}
      >
        <button>Volver al menú 🔁</button>
      </Link>
    </main>
  );
};

export default Results;