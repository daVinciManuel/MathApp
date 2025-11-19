import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { 
  saveResult, 
  //getUserResults, 
  //getUserStats 
} from "../controllers/results.js";

const router = express.Router();

// Guardar resultado (protegida)
router.post("/save", verifyToken, saveResult);




export default router;