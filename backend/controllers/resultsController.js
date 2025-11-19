import pkg from "../db/models/index.cjs";
const { Records, User } = pkg;
import { Sequelize } from "sequelize";

// --------- Guardar Resultado ------------
export async function saveResult(req, res) {
  try {
    const { userId, accuracy, duration } = req.body;

    if (!userId || accuracy === undefined || duration === undefined) {
      return res.status(400).json({ 
        error: 'Faltan datos requeridos para guardar el resultado' 
      });
    }

    // Verificar que el usuario existe
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Resultado a guardar
    const newResult = await Records.create({
      userId,
      accuracy,
      duration,
      date: new Date()
    });

    return res.status(201).json({ 
      message: "Resultado guardado exitosamente", 
      result: newResult 
    });

  } catch (e) {
    console.error('Error al guardar resultado:', e);
    return res.status(500).json({ error: e.message });
  }
}

// --------- Obtener Resultados de un Usuario ------------
export async function getUserResults(req, res) {
  try {
    const { userId } = req.params;

    const results = await Result.findAll({
      where: { userId },
      order: [['date', 'DESC']],
      include: [{
        model: User,
        attributes: ['name', 'lastname', 'email']
      }]
    });

    return res.status(200).json({ 
      message: "Resultados obtenidos exitosamente", 
      results 
    });

  } catch (e) {
    console.error('Error al obtener resultados:', e);
    return res.status(500).json({ error: e.message });
  }
}