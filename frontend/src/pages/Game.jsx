import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loading";
//import fetchGame from "../axios/fetchGame.js";
import Ejercicio from "../components/Ejercicio";
import "./css/game.css";
import "./css/general.css";

var correctAnswers = 0;
var startTime = null;
const Game = () => {
  const [indice, setIndice] = useState(0);
  const [ejercicios, setEjercicios] = useState();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Inicia el juego al cargar
  useEffect(() => {
    let [nivel, operacion] = ["1", "multiplicacion"];
    axios
      .get(`https://mathapp-ug8r.onrender.com/api/game/n${nivel}/${operacion}`)
      .then((res) => {
        let data = res.data;
        setEjercicios(data);
      })
      .catch((err) => {
        console.log("Error fetching game: " + err);
      })
      .finally(() => {
        setLoading(false);
      });
    startTime = Date.now();
  }, []);
  const handleRespuesta = (isCorrect) => {
    // if (isCorrect) setCorrect(correct + 1);
    if (isCorrect) correctAnswers += 1;

    if (indice + 1 >= ejercicios.length) {
      const duration = Math.floor((Date.now() - startTime) / 1000);
      const accuracy = Math.round((correctAnswers / ejercicios.length) * 100);
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
