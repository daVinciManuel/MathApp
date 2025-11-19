/*
PONER EN EL BACKEND (Node.js / Express):
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

export default router;*/

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./css/general.css";
import "./css/results.css";

const Results = () => {
  const location = useLocation();
  const { accuracy = 0, duration = 0 } = location.state || {};

  const [aiMessage, setAiMessage] = useState("Generando mensaje...");
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");

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
        const response = await fetch("http://localhost:3000/api/generate-message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ accuracy, duration })
        });

        const data = await response.json();
        setAiMessage(data.message);
      } catch (error) {
        console.error(error);
        setAiMessage("No pude generar un mensaje ahora 😢");
      }
    };

    getAIMessage();
  }, [accuracy, duration]);

  return (
    <main id="results">
      <Link to="/home">
        <button>🏠️</button>
      </Link>

      <Link to="/menu">
        <button className="btn">Menú</button>
      </Link>

      {image && (
        <img
        src={image}
        alt="Resultado"
        style={{ width: "150px", marginBottom: "15px" }}
        />
      )}

      <h2>{message}</h2>
      
      <p className="ai-message" style={{ marginTop: "10px", fontStyle: "italic" }}>
        {aiMessage}
      </p>

      <div className="stats">
        <p>Precisión: <strong>{accuracy}%</strong></p>
        <p>Duración: <strong>{duration}s</strong></p>
      </div><br/>

      <Link to="/login">
        <button>Iniciar sesión</button>
      </Link>
    </main>
  );
};

export default Results;