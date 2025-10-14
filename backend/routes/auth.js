import express, { Router } from "express";
import User from "../models/Users.js";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    try{

        const { name, fullname, email, age, pass } = req.body;
        const hashedPass = await bcrypt.hash(pass,10);

        const newUser = await User.create({
            name,
            fullname,
            email,
            age,
            pass: hashedPass
        });

        res.status(201).json({ message: "Usuario registrado", user: newUser})
    } catch (e){
        res.status(500).json({error: e.message})
    }
});

router.post("/login", async (req,res) => {
    try {
        const { email,pass } = req.body;
        const user = await User.findOne({
            where: {email: email}
        });
        if (!user) return res.status(404).json({ message: "usuario no encontrado"});
        
        const passOK = await bcrypt.compare(pass,user.pass)
        if(!passOK) return res.status(401).json({message: "credenciales incorrectas"});

        const token = jwt.sign({id:user.id},process.env.JWT_SAL, {expiresIn: "4h"});
        res.status(200).json({token});
    } catch (e) {
        res.status(500).json({ error: e.message})
    }
});

router.get("/profile", verifyToken, async (req,res) => {
    try{
        const user = await User.findByPk(req.userId, {
            attributes: ["id", "name", "fullname", "email", "age"]
        })
    
        if (!user) return res.status(404).json({ message: "Usuario no encontrado"});
    
        res.status(200).json(user);
    } catch (e) {
        res.status(500).json({error: e.message});
    }
});

export default router;