import express from "express";
import {
  //getUserResults, 
  getUserResults,
  saveResult
} from "../controllers/resultsController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// Guardar resultado (protegida)
router.post("/save", verifyToken, saveResult);

// Muestra resultados de un usuario
router.get('/user/:id',verifyToken, getUserResults);


export default router;