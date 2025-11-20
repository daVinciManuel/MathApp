import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
// import { conn } from "./db/conexion.js";
import authRoutes from "./routes/auth.js";
import gameRoutes from "./routes/game.js";
import resultsRoutes from "./routes/results.js";
import openaiRoutes from "./routes/openai.js";
// ---------------- db ----------------
import pkg from "./db/models/index.cjs";
const { sequelize } = pkg
// ------------------------------------
dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://mathapp-ug8r.onrender.com",
  'https://naomathalloween.netlify.app/'
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
app.use("/api/game", gameRoutes);
app.use("/api/results", resultsRoutes);
app.use("/api/openai", openaiRoutes);

app.get("/", (req, res) => {
  res.send(
    "<center><h1>Welcome to the Naomat API :D</h1></center><p>Hello world!</p>"
  );
});

async function startServer() {
  try {
    await sequelize.sync();
    console.log('DB connected');

    app.listen(5000, () => {
      console.log("Server is running on http://localhost:5000");
    });

  } catch (err) {
    console.log('DB connection error:', err)
  }
}
startServer()

// conn
//   .sync()
//   .then(() => {
//     app.listen(5000, () => {
//       console.log("Server is running on http://localhost:5000");
//     });
//   })
//   .catch((err) => console.log("Error creating DB: " + err));
