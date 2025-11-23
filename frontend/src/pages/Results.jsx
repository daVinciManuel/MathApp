import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../core/context/authContext";
import { checkUserAuth, generateAIMessage, saveGameResult } from "../core/services/resultsService";
import "./css/general.css";
import "./css/results.css";

const Results = () => {
  const [isLogged, setIsLogged] = useState(false);
  const location = useLocation();
  const { accuracy = 0, duration = 0 } = location.state || {};

  const [aiMessage, setAiMessage] = useState("Generando mensaje...");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");

  const { user } = useAuth();
  let userId = false;
  if (user !== null && user.id !== null) {
    userId = user.id;
  }
  useEffect(() => {
    checkUserAuth()
      .then((isAuth) => {
        setIsLogged(isAuth);
      })
      .catch(() => {
        setIsLogged(false);
      });
  }, []);

  // Mensaje según porcentaje
  useEffect(() => {
    if (accuracy >= 80) {
      setMessage("¡Excelente! 🎉");
      setImage("/img/amazing.png");
    } else if (accuracy >= 50) {
      setMessage("¡Bien hecho! 👍");
      setImage("/img/buen-trabajo.png");
    } else {
      setMessage("Sigue practicando 💪");
      setImage("/img/puedes-mejorar.png");
    }
  }, [accuracy]);

  // Mensaje generado por backend (que a su vez llama a OpenAI)
  useEffect(() => {
    const getAIMessage = async () => {
      try {
        const message = await generateAIMessage({ accuracy, duration });
        setAiMessage(message);
      } catch (error) {
        setAiMessage("No pude generar un mensaje ahora 😢");
      }
    };

    getAIMessage();
  }, [accuracy, duration]);

  // Guardar resultados en backend
  useEffect(() => {
    const saveResults = async () => {
      if (!userId) {
        console.warn("No hay usuario logueado. No se guardará el resultado.");
        return;
      }

      try {
        await saveGameResult({
          userId,
          accuracy,
          duration,
        });
      } catch (error) {
        console.error("Error guardando resultado:", error);
      }
    };

    if (userId) {
      saveResults();
    }
  }, [userId, accuracy, duration]);

  return (
    <main id="results">

      {image && (
        <img
          src={image}
          alt="Resultado"
          style={{ width: "150px", marginBottom: "15px" }}
        />
      )}

      <h2>{message}</h2>

      <p
        className="ai-message"
        style={{ marginTop: "10px", fontStyle: "italic" }}
      >
        {aiMessage}
      </p>

      <div className="stats">
        <p>
          Precisión: <strong>{accuracy}%</strong>
        </p>
        <p>
          Duración: <strong>{duration}s</strong>
        </p>
      </div>
      <br />

      {!isLogged ? (
        <Link to="/login">
          <button>Iniciar sesión</button>
        </Link>
      ) : (
        <Link to="/">
          <button>🏠️ inicio</button>
        </Link>

      )}
    </main>
  );
};

export default Results;
