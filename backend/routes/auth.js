import bcrypt from "bcrypt";
import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { getProfile, loginUser, logoutUser, registerUser } from "../controllers/authController.js";
// import User from "../models/Users.js";
const router = express.Router();

// REGISTRO
router.post("/register", registerUser);

// si LOGIN OK then CREA y ENVIA JWON WEB TOKEN (JWT)
router.post("/login", loginUser);

// aplica MIDDLEWARE 'verifyToken'
// si no verifica token, no ejecuta la funcion flecha
router.get("/profile", verifyToken, getProfile);

router.post("/logout", logoutUser);

export default router;
