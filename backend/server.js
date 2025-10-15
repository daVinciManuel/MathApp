import express from 'express';
import { sequelize } from "./db/conexion.js";
import authRoutes from "./routes/auth.js";
import gameRoutes from "./routes/game.js";

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api/auth", authRoutes)
app.use("/api/game", gameRoutes)

// sequelize.sync()
    // .then(() =>{
        app.listen(5000,() => {
            console.log('Server is running on http://localhost:5000')
        })
    // })
    // .catch((err) => console.log("Error creating DB: " + err))