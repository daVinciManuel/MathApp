import { getMyCustomGames } from "@core/services/newGameService.js";
import { useEffect, useState } from "react";
import styles from "../css/MyGames.module.css";

const MyGames = () => {
  const [games, setGames] = useState([]);
  const [openGameId, setOpenGameId] = useState(null);

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
  
  const handleGameClick = (gameId) => {
    setOpenGameId(prevId => (prevId === gameId ? null : gameId));
  };

  const handleAction = (e, action, gameId) => {
    e.stopPropagation();
    console.log(`${action} juego con ID: ${gameId}`);
  };

  return (
    <div className={styles.myGamesContainer}>
      <h2 className={styles.title}>Mis juegos creados</h2>
      <p className={styles.instruction}>Haz click en cualquier juego para ver sus ejercicios</p>
      
      <div>
        {games.length === 0 ? (
          <p>No has creado ningún juego aún.</p>
        ) : (
          <ul className={styles.gamesList}>
            {games.map((game) => (
              <li
                key={game.id}
                className={styles.gameCard}
                onClick={() => handleGameClick(game.id)}
              >
                <div className={styles.gameIcon}>
                  <i className="fas fa-calculator"></i> 
                </div>

                <div className={styles.infoPrincipal}>
                  <h3 className={styles.gameName}>{game.gameName}</h3>
                  <p className={styles.metadata}>
                    <i className="far fa-clock"></i> 
                    Modificado: {new Date(game.createdAt).toLocaleDateString()}
                  </p>
                </div>
                
                <div className={styles.actions}>
                  <i 
                    className={`fas fa-edit ${styles.actionEdit}`} 
                    onClick={(e) => handleAction(e, 'Editar', game.id)}
                  ></i>
                  
                  <i 
                    className={`fas fa-trash-alt ${styles.actionDelete}`}
                    onClick={(e) => handleAction(e, 'Eliminar', game.id)}
                  ></i>
                  
                  <i 
                    className={`fas ${
                      openGameId === game.id ? 'fa-chevron-down' : 'fa-chevron-right'
                    } ${styles.actionDetail}`}
                  ></i>
                </div>
              </li>
              
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyGames;