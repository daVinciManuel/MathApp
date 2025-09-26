import { Link } from "react-router-dom";
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

export default Results;