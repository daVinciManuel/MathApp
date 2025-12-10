import Ejercicio from "@components/Ejercicio";
import GameMenu from "@components/GameMenu";
import Loading from "@components/Loading";
import { getGameExercises } from "@core/services/gameService";
import { getAllCustomGames } from "@core/services/newGameService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/general.css";
import "./css/game.css";

let correctAnswers = 0;
var startTime = null;
const Game = () => {
  const [indice, setIndice] = useState(0);
  const [ejercicios, setEjercicios] = useState();
  const [loading, setLoading] = useState(true);
  const [gameOption, setGameOption] = useState();
  const [customGames, setCustomGames] = useState([]);
  const [showingCustomMenu, setShowingCustomMenu] = useState(false);

  const navigate = useNavigate();

  // Inicia el juego al cargar
  useEffect(() => {
    if (gameOption) {
      let [nivel, operacion] = gameOption;

      // Si se seleccionó el menú de ejercicios personalizados
      if (operacion === 'custom-menu') {
        setLoading(true);
        getAllCustomGames()
          .then(res => {
            if (res.data.success && res.data.games) {
              setCustomGames(res.data.games);
              setShowingCustomMenu(true);
              setLoading(false);
            }
          })
          .catch(err => {
            console.error('Error:', err);
            setCustomGames([]);
            setShowingCustomMenu(true);
            setLoading(false);
          });
        return;
      }

      setShowingCustomMenu(false);
      setLoading(true);  
      
      // Verificar si es un ejercicio personalizado
      if (operacion && operacion.startsWith('custom-')) {
        const gameId = operacion.replace('custom-', ''); // Extrae el ID

        //Mostrar los juegos personalizados y filtrar por ID
        getAllCustomGames()
          .then(res => {
            console.log('Datos recibidos:', res.data);
            if (res.data.success && res.data.games) {
              const game = res.data.games.find(g => g.id === parseInt(gameId));
              console.log('Juego encontrado:', game);
              if (game) {
                console.log('Ejercicios:', game.exercises);
                setEjercicios(game.exercises);
                setLoading(false);
              } else {
                console.error('Juego no encontrado');
                setLoading(false);
              }
            }
          })
          .catch(err => {
            console.error('Error:', err);
            setLoading(false);
          });
      } else {
        // Ejercicios normales (suma, resta, etc.)
        getGameExercises(nivel, operacion)
          .then((res) => {
            let data = res.data;
            setEjercicios(data);
            setShowingCustomMenu(false);
            setLoading(false);
          })
          .catch((err) => {
            console.log("Error fetching game: " + err);
            setLoading(false);
          });
      }
      
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
        ) : showingCustomMenu ? (
          <menu className="game-menu menu-custom-games">
            {customGames.length > 0 ? (
              <>
                {customGames.map((game) => (
                  <li 
                    key={game.id} 
                    onClick={() => setGameOption([null, `custom-${game.id}`])}
                  >
                    {game.gameName}
                  </li>
                ))}
              </>
            ) : (
              <li className="no-games">
                No hay ejercicios personalizados por ahora
              </li>
            )}
          </menu>
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
