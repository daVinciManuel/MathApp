import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middleware/verifyToken.js";
import User from "../models/Users.js";

const router = express.Router();

// REGISTRO
router.post("/register", async (req, res) => {
  try {
    const { name, lastname, email, age, pass } = req.body;
    const hashedPass = await bcrypt.hash(pass, 10);

    const newUser = await User.create({
      name,
      lastname,
      email,
      age,
      pass: hashedPass,
    });

    res.status(201).json({ message: "Usuario registrado", user: newUser });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// si LOGIN OK then CREA y ENVIA JWON WEB TOKEN (JWT)
router.post("/login", async (req, res) => {
  try {
    const { email, pass } = req.body;
    const user = await User.findOne({
      where: { email: email },
    });
    if (!user)
      return res.status(404).json({ message: "usuario no encontrado" });

    const passOK = await bcrypt.compare(pass, user.pass);
    if (!passOK)
      return res.status(401).json({ message: "credenciales incorrectas" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SAL, {
      expiresIn: "4h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      // uncomment the following line in production with HTTPS
      secure: true, // only over HTTPS
      sameSite: "strict",
      maxAge: 4 * 60 * 60 * 1000, // 4 hours
    });

    res.status(200).json({ message: "login ok" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// aplica MIDDLEWARE 'verifyToken'
// si no verifica token, no ejecuta la funcion flecha
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: ["id", "name", "lastname", "email", "age"],
    });

    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
