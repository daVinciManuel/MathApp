import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
//import fetchGame from "../axios/fetchGame.js";
import AppHeader from "../components/AppHeader";
import Ejercicio from "../components/Ejercicio";
import GameMenu from "../components/GameMenu";
import "./css/game.css";
import "./css/general.css";

let correctAnswers = 0;
var startTime = null;
const Game = () => {
  const [indice, setIndice] = useState(0);
  const [ejercicios, setEjercicios] = useState();
  const [loading, setLoading] = useState(true);
  const [gameOption, setGameOption] = useState();

  const navigate = useNavigate();

  // Inicia el juego al cargar
  useEffect(() => {
    if (gameOption) {
      let [nivel, operacion] = gameOption;
      axios
        .get(`http://localhost:5000/api/game/n${nivel}/${operacion}`)
        .then((res) => {
          let data = res.data;
          setEjercicios(data);
          setTimeout(() => {
            setLoading(false);
          }, 400);
        })
        .catch((err) => {
          console.log("Error fetching game: " + err);
          setTimeout(() => {
            setLoading(false);
          }, 400);
        });
      startTime = Date.now();
    }
  }, [gameOption]);
  const handleRespuesta = (isCorrect) => {
    if (isCorrect) correctAnswers += 1;

    if (indice + 1 >= ejercicios.length) {
      const duration = Math.floor((Date.now() - startTime) / 1000);
      const accuracy = Math.round((correctAnswers / ejercicios.length) * 100);
      correctAnswers = 0;
      navigate("/results", { state: { accuracy, duration } });
    } else {
      setIndice((prev) => prev + 1);
    }
  };

  const handleOption = (nivel, operacion) => {
    setGameOption([nivel, operacion]);
  };

  return (
    <>
      <main id="game">
        {!gameOption ? (
          <GameMenu onSelected={handleOption} />
        ) : loading ? (
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
    </>
  );
};

export default Game;
