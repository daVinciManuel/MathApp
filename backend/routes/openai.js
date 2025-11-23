import express from "express";
import { generateMotivationalMessage } from "../controllers/openaiController.js";

const router = express.Router();

// Generar mensaje motivador
router.post("/generate-message", generateMotivationalMessage);

export default router;