import { 
  saveCustomGame,
  showCustomGames,  
  showMyCustomGames,
  generateCustomGame
} from "../controllers/gameController.js";

const router = express.Router();

//Guardar juego personalizado
router.post("/save", verifyToken, saveCustomGame);

//Mostrar juego personalizado a alumnos
router.post("/show", verifyToken, showCustomGames);

//Mostrar mis juegos personalizados a profesores
router.post("/show/myGames", verifyToken, showMyCustomGames);

//Generar juego personalizado
router.post("/generate", verifyToken, generateCustomGame);

export default router;