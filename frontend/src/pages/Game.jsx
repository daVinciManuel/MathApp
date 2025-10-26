/*import { Link } from "react-router-dom";
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

export default Game;*/
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/general.css";
import "./css/game.css";

const Game = () => {
  const [a] = useState(3);
  const [b] = useState(8);
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/results");
  };

  return (
    <main id="game">
      <div className="progress-bar">
        <div className="progress"></div>
      </div>
      <div className="operation">{a} + {b}</div>
      <p>Result:</p>
      <input
        type="number"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <br />
      <button onClick={handleNext}>Next ➜</button>
    </main>
  );
};

export default Game;
