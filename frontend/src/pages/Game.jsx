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
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loading";
//import fetchGame from "../axios/fetchGame.js";
import Ejercicio from "../components/Ejercicio";
import "./css/game.css";
import "./css/general.css";

const Game = () => {
  const [indice, setIndice] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [ejercicios, setEjercicios] = useState();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Inicia el juego al cargar
  useEffect(() => {
    setLoading(true);
    let [nivel, operacion] = ["1", "division"];
    axios
      .get(`http://localhost:5000/api/game/n${nivel}/${operacion}`)
      .then((res) => {
        console.log(res.data);
        let data = res.data;
        setEjercicios(data);
      })
      .catch((err) => {
        console.log("Error fetching game: " + err);
      })
      .finally(() => {
        setLoading(false);
      });
    setStartTime(Date.now());
  }, []);

  const handleRespuesta = (isCorrect) => {
    if (isCorrect) setCorrect((prev) => prev + 1);

    if (indice + 1 >= ejercicios.length) {
      const duration = Math.floor((Date.now() - startTime) / 1000);
      const accuracy = Math.round((correct / ejercicios.length) * 100);
      navigate("/results", { state: { accuracy, duration } });
    } else {
      setIndice((prev) => prev + 1);
    }
  };

  return (
    <main id="game">
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${(indice / ejercicios.length) * 100}%` }}
            ></div>
          </div>

          <Ejercicio
            ejercicio={ejercicios[indice]}
            onRespuesta={handleRespuesta}
          />
        </>
      )}
    </main>
  );
};

export default Game;
