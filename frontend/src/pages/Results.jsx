/* CÓDIGO BACKEND API OPEN AI

EN backend/routes/openai.js:
import express from "express";
import OpenAI from "openai";

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post("/generate-message", async (req, res) => {
  const { accuracy, duration } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Eres un asistente que genera mensajes motivadores para estudiantes de matemáticas." },
        { role: "user", content: `El usuario obtuvo ${accuracy}% de precisión en ${duration} segundos. Dale un mensaje motivador y breve.` }
      ]
    });

    res.json({ message: completion.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "No se pudo generar el mensaje" });
  }
});

export default router;


EN server.js:
import openaiRoutes from "./routes/openai.js";
app.use("/api", openaiRoutes);*/

/*************************************************************/

/* CÓDIGO BACKEND HTTP REQUEST

EN backend/models/Result.js:
import { DataTypes } from "sequelize";
import { conn } from "../db/conexion.js";

const Result = conn.define("Result", {
  accuracy: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

export default Result;

EN backend/routes/results.js:
import express from "express";
import Result from "../models/Result.js";

const router = express.Router();

router.post("/save", async (req, res) => {
  const { userId, accuracy, duration } = req.body;

  try {
    const result = await Result.create({
      userId,
      accuracy,
      duration
    });

    res.json({
      message: "Resultado guardado correctamente",
      result
    });

  } catch (error) {
    console.error("Error guardando resultado:", error);
    res.status(500).json({ error: "No se pudo guardar el resultado" });
  }
});

// Obtener todas las partidas de un usuario
router.get("/user/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const results = await Result.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]] // las más recientes primero
    });

    res.json(results);

  } catch (error) {
    console.error("Error obteniendo historial:", error);
    res.status(500).json({ error: "No se pudo obtener el historial" });
  }
});

export default router;

EN server.js:
import resultsRoutes from "./routes/results.js";
app.use("/api/results", resultsRoutes);*/

import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";
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
  const userId = user.id ?? false;
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/profile", { withCredentials: true })
      .then(() => {
        setIsLogged(true);
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
        // Aquí llamamos al endpoint de tu backend
        const response = await fetch(
          "http://localhost:5000/api/generate-message",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ accuracy, duration }),
          }
        );

        const data = await response.json();
        setAiMessage(data.message);
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

      await axios
        .post(
          "http://localhost:5000/api/results/save",
          {
            userId,
            accuracy,
            duration,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        )
        // .then((response) => {
        // console.log("Resultado guardado:", response);
        // })
        .catch((error) => {
          console.error("Error guardando resultado:", error);
        });
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
