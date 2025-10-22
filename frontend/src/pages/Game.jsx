import { Link } from "react-router-dom";
import "./css/general.css";
import "./css/game.css";

const Game = () => {
  return (
    <main id="game">
        <Link to="/home">
            <a>🏠️</a>
        </Link>
        <h1>Juego</h1>
        <input type="number" placeholder="Tu respuesta" />
        <br /><br />
        <button>Siguiente</button>

        <br /><br />
        <Link to="/results">
            <a className="btn">Finalizar Juego</a>
        </Link>
    </main>
  );
};

export default Game;