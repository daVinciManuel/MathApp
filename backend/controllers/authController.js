import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Sequelize } from "sequelize";
import pkg from "../db/models/index.cjs";
const { User } = pkg;

// --------- Register User ------------
export async function registerUser(req, res) {
  try {
    const { name, lastname, email, age, pass, role } = req.body;
    const hashedPass = await bcrypt.hash(pass, 10);

    const newUser = await User.create({
      name,
      lastname,
      email,
      age,
      pass: hashedPass,
      role,
    });

    return res
      .status(201)
      .json({ message: "Usuario stored succesfully.", user: newUser });
  } catch (e) {
    if (e instanceof Sequelize.UniqueConstraintError) {
      return res.status(400).json({ error: "User already exists." });
    }
    return res.status(500).json({ error: e.message });
  }
}
//
// --------- Login User ------------
export async function loginUser(req, res) {
  try {
    const { email, pass: password } = req.body;
    const user = await User.findOne({
      where: { email: email },
    });
    if (!user)
      return res.status(404).json({ message: "usuario no encontrado" });

    const passOK = await bcrypt.compare(password, user.pass);
    if (!passOK)
      return res.status(401).json({ message: "credenciales incorrectas" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SAL,
      {
        expiresIn: "4h",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      // uncomment the following line in production with HTTPS
      secure: true, // only over HTTPS
      sameSite: "none",
      maxAge: 4 * 60 * 60 * 1000, // 4 hours
    });

    return res.status(200).json({ message: "login ok" });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
//
// -------------- Get Profile of User -------------
export async function getProfile(req, res) {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: ["id", "name", "lastname", "email", "age", "role"],
    });

    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    return res.status(200).json(user);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
//
// -------------- Logout -------------
export async function logoutUser(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
    // make it true for HTTPS:
    secure: false,
  });
  return res.status(200).json({ message: "Logout ok" });
}
