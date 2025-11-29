import express from "express";
import {
  saveCustomGame,
  showCustomGames,
  showMyCustomGames,
} from "../controllers/customGameController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

//Guardar juego personalizado
router.post("/save", verifyToken, saveCustomGame);

//Mostrar juego personalizado a alumnos
router.get("/show", verifyToken, showCustomGames);

//Mostrar mis juegos personalizados a profesores
router.get("/showMyGames", verifyToken, showMyCustomGames);

export default router;
