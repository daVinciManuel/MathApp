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
import { Link } from "react-router-dom";
import "./css/general.css";
import "./css/results.css";
import pinguin from "../assets/img/pinguino.png";

const Results = () => {
  return (
    <main id="results">
      <img src={pinguin} alt="Naomat" />
      <p>Looks like you can handle this...</p>
      <div className="stats">
        <p>Accuracy: <strong>89%</strong></p>
        <p>Duration: <strong>38s</strong></p>
      </div>
      <h2>Good Job</h2>

      <Link to="/login" style={{ position: "absolute", bottom: "20px", right: "20px" }}>
        <button>Login 🔒</button>
      </Link>
    </main>
  );
};

export default Results;
