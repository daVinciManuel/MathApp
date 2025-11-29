import pkg from "../db/models/index.cjs";
const { CustomGame } = pkg;
// --------- Guardar juego customizado ------------
export async function saveCustomGame(req, res) {
  try {
    const { gameName, exercises } = req.body;
    const userId = req.userId;

    if (!gameName || !exercises) {
      return res.status(400).json({ error: "Faltan datos requeridos" });
    }

    if (gameName.trim().length === 0) {
      return res.status(400).json({
        error: "El nombre del juego no puede estar vacío",
      });
    }

    if (!Array.isArray(exercises)) {
      return res.status(400).json({
        error: "Los ejercicios deben ser un array",
      });
    }

    if (exercises.length < 1 || exercises.length > 20) {
      return res.status(400).json({
        error: "El número de ejercicios debe estar entre 1 y 20",
      });
    }
    for (let i = 0; i < exercises.length; i++) {
      const e = exercises[i];

      if (
        typeof e !== "object" ||
        !("type" in e) ||
        !("num1" in e) ||
        !("operation" in e) ||
        !("num2" in e) ||
        !("customExercise" in e) ||
        !("answers" in e) ||
        String(e.type).trim() === "" ||
        String(e.answers).trim() === "" ||
        (String(e.type).trim() !== "complex" &&
          String(e.type).trim() !== "simple") ||
        (e.type === "simple" &&
          (isNaN(e.num1) ||
            isNaN(e.num2) ||
            String(e.operation).trim() === "")) ||
        (e.type === "complex" && String(e.customExercise).trim() === "")
      ) {
        return res.status(400).json({
          error: `Ejercicio inválido en el índice ${i}`,
        });
      }
    }
    // Crear el juego
    const newCustomGame = await CustomGame.create({
      userId,
      gameName,
      exercises,
    });

    return res.status(201).json({
      message: "Juego creado exitosamente",
      data: newCustomGame,
    });
  } catch (e) {
    console.error("Error al crear juego:", e);
    return res.status(500).json({ error: e.message });
  }
}

// --------- Mostrar todos los juegos customizados (Alumnos) ------------
export async function showCustomGames(req, res) {
  try {
    const games = await CustomGame.findAll({
      attributes: ["createdBy", "gameName", "exercises", "createdAt"],
      include: [
        {
          model: User,
          as: "creator",
          attributes: ["name", "lastname"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      message: "Juegos customizados obtenidos exitosamente",
      count: games.length,
      games,
    });
  } catch (e) {
    console.error("Error al obtener juegos customizados:", e);
    return res.status(500).json({
      error: "Error al obtener juegos",
      message: e.message,
    });
  }
}

// --------- Mostrar juegos customizados x Admin ------------
export async function showMyCustomGames(req, res) {
  try {
    const userId = req.user.id;

    if (req.user.role !== "admin") {
      return res.status(403).json({
        error: "Solo los administradores pueden ver sus juegos",
      });
    }

    const games = await CustomGame.findAll({
      where: { createdBy: userId },
      attributes: ["id", "name", "numEjercicios", "ejercicios", "createdAt"],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      success: true,
      message: "Mis juegos obtenidos exitosamente",
      count: games.length,
      games,
    });
  } catch (e) {
    console.error("Error al obtener mis juegos:", e);
    return res.status(500).json({
      error: "Error al obtener juegos",
      message: e.message,
    });
  }
}

// --------- Generar ejercicios de un juego customizado ------------
export async function generateCustomGame(req, res) {
  try {
    const { gameId } = req.params;

    // Obtener el juego
    const game = await CustomGame.findByPk(gameId);

    if (!game) {
      return res.status(404).json({
        error: "Juego no encontrado",
      });
    }

    // Generar los ejercicios aleatorios
    const ejerciciosGenerados = game.ejercicios.map(
      (ejercicioConfig, index) => {
        // Generar términos aleatorios según la configuración
        const terminos = ejercicioConfig.terminos.map((terminoConfig) => {
          const { min, max } = terminoConfig;
          return randomInRange(min, max);
        });

        // Construir la operación completa
        const operacion = construirOperacion(
          terminos,
          ejercicioConfig.operadores
        );

        // Calcular el resultado correcto
        const resultado = calcularResultado(
          terminos,
          ejercicioConfig.operadores
        );

        return {
          ejercicioId: index + 1,
          terminos,
          operadores: ejercicioConfig.operadores,
          operacion, // Ej: "5 + 3 - 2"
          resultado,
        };
      }
    );

    return res.status(200).json({
      success: true,
      message: "Ejercicios generados exitosamente",
      gameInfo: {
        id: game.id,
        name: game.name,
        numEjercicios: game.numEjercicios,
      },
      ejercicios: ejerciciosGenerados,
    });
  } catch (e) {
    console.error("Error al generar ejercicios:", e);
    return res.status(500).json({
      error: "Error al generar ejercicios",
      message: e.message,
    });
  }
}

// --------- Helper: Generar número aleatorio en rango ------------
function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// --------- Helper: Construir string de operación ------------
function construirOperacion(terminos, operadores) {
  let operacion = terminos[0].toString();

  for (let i = 0; i < operadores.length; i++) {
    const operador = operadores[i] === "suma" ? "+" : "-";
    operacion += ` ${operador} ${terminos[i + 1]}`;
  }

  return operacion;
}

// --------- Helper: Calcular resultado ------------
function calcularResultado(terminos, operadores) {
  let resultado = terminos[0];

  for (let i = 0; i < operadores.length; i++) {
    if (operadores[i] === "suma") {
      resultado += terminos[i + 1];
    } else if (operadores[i] === "resta") {
      resultado -= terminos[i + 1];
    }
  }

  return resultado;
}
