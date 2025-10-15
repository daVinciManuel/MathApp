import express from 'express';
import { juego } from '../game/generator.js';
const router = express.Router();

router.get("/n1/suma", (req, res) => {
    const gameObj = juego();
    res.status(200).json(gameObj);
})

export default router;