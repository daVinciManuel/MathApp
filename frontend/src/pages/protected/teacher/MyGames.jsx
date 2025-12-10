import { getMyCustomGames } from "@core/services/newGameService.js";
import { useEffect, useState } from "react";
const MyGames = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    async function fetchGames() {
      try {
        const response = await getMyCustomGames();
        setGames(response.data);
      } catch (error) {
        console.error("Error al obtener mis juegos customizados:", error);
      }
    }
    fetchGames();
  }, []);
  console.log(games);
  return (
    <div>
      <h2>Mis juegos creados</h2>
      <p>Aquí aparecerá la lista de juegos creados por el profesor.</p>
      <div>
        {games.length === 0 ? (
          <p>No has creado ningún juego aún.</p>
        ) : (
          <ul>
            {games.map((game) => (
              <li key={game.id}>
                <h3>{game.gameName}</h3>
                <span>
                  Modificado el: {new Date(game.createdAt).toLocaleDateString()}
                </span>
                <p>Número de ejercicios: {game.exercises.length}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyGames;
