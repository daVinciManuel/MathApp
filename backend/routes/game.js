import express from 'express';
import {juegoSuma, juegoResta, juegoMultiplicacion, juegoDivision} from '../game/generator.js';
const router = express.Router();

//------------------------------------------
//                 SUMA 
//------------------------------------------
//Nivel 1
router.get("/n1/suma", (req, res) => {
    const ejercicios = juegoSuma('facil'); 
    res.status(200).json(ejercicios);
}); 

//Nivel 2
router.get("/n2/suma", (req, res) => {
    const ejercicios = juegoSuma('intermedio'); 
    res.status(200).json(ejercicios);
}); 

//Nivel 3
router.get("/n3/suma", (req, res) => {
    const ejercicios = juegoSuma('dificil'); 
    res.status(200).json(ejercicios);
});


//------------------------------------------
//                  RESTA 
//------------------------------------------
//Nivel 1
router.get("/n1/resta", (req, res) => {
    const ejercicios = juegoResta('facil'); 
    res.status(200).json(ejercicios);
}); 

//Nivel 2
router.get("/n2/resta", (req, res) => {
    const ejercicios = juegoResta('intermedio'); 
    res.status(200).json(ejercicios);
}); 

//Nivel 3
router.get("/n3/resta", (req, res) => {
    const ejercicios = juegoResta('dificil'); 
    res.status(200).json(ejercicios);
});


//------------------------------------------
//             MULTIPLICACIÓN
//------------------------------------------
//Nivel 1
router.get("/n1/multiplicacion", (req, res) => {
    const ejercicios = juegoMultiplicacion('facil'); 
    res.status(200).json(ejercicios);
}); 

//Nivel 2
router.get("/n2/multiplicacion", (req, res) => {
    const ejercicios = juegoMultiplicacion('intermedio'); 
    res.status(200).json(ejercicios);
}); 

//Nivel 3
router.get("/n3/multiplicacion", (req, res) => {
    const ejercicios = juegoMultiplicacion('dificil'); 
    res.status(200).json(ejercicios);
});


//------------------------------------------
//                DIVISIÓN
//------------------------------------------
// Nivel 1: DIVISIÓN FÁCIL
router.get("/n1/division", (req, res) => {
    const ejercicios = juegoDivision('facil'); 
    res.status(200).json(ejercicios);
}); 

// Nivel 2: DIVISIÓN INTERMEDIA
router.get("/n2/division", (req, res) => {
    const ejercicios = juegoDivision('intermedio'); 
    res.status(200).json(ejercicios);
}); 

// Nivel 3: DIVISIÓN DIFÍCIL
router.get("/n3/division", (req, res) => {
    const ejercicios = juegoDivision('dificil'); 
    res.status(200).json(ejercicios);
});



export default router;