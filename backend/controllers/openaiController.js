import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function generateMotivationalMessage(req, res) {
  try {
    const { accuracy, duration } = req.body;

    if (accuracy === undefined || duration === undefined) {
      return res.status(400).json({
        error: "Se requieren accuracy y duration",
      });
    }

    console.log(`Generando mensaje corto para: ${accuracy}% en ${duration}s`);

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "Eres un asistente motivador para estudiantes de matemáticas. Genera mensajes BREVES de máximo 2-3 líneas. Sé conciso, positivo y usa emojis apropiados.",
        },
        {
          role: "user",
          content: `Estudiante obtuvo ${accuracy}% de precisión en ${duration} segundos. Mensaje corto y motivador (máximo 3 líneas):`,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.8,
      max_tokens: 70,
      top_p: 1,
      stream: false,
    });

    const message =
      completion.choices[0]?.message?.content || "¡Buen trabajo! 💪";

    console.log("Mensaje generado");

    return res.status(200).json({
      success: true,
      message,
    });
  } catch (error) {
    console.error("Error con Groq:", error.message);
    return res.status(500).json({
      success: false,
      message: "¡Sigue practicando! 💪",
    });
  }
}
