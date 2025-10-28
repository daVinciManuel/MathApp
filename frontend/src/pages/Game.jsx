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
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/general.css";
import "./css/game.css";

const Game = () => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [answer, setAnswer] = useState("");
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);
  const [startTime, setStartTime] = useState(null);

  const navigate = useNavigate();

  // Genera una operación nueva
  const newOperation = () => {
    const x = Math.floor(Math.random() * 10) + 1;
    const y = Math.floor(Math.random() * 10) + 1;
    setA(x);
    setB(y);
    setAnswer("");
  };

  // Inicia el juego al cargar
  useEffect(() => {
    newOperation();
    setStartTime(Date.now());
  }, []);

  const handleNext = () => {
    const result = a + b;
    const isCorrect = parseInt(answer) === result;

    setTotal(total + 1);
    if (isCorrect) setCorrect(correct + 1);

    // después de 5 operaciones -> ir a resultados
    if (total + 1 >= 5) {
      const duration = Math.floor((Date.now() - startTime) / 1000);
      const accuracy = Math.round(((correct + (isCorrect ? 1 : 0)) / (total + 1)) * 100);

      navigate("/results", { state: { accuracy, duration } });
    } else {
      newOperation();
    }
  };

  return (
    <main id="game">
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${((total / 5) * 100)}%` }}
        ></div>
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