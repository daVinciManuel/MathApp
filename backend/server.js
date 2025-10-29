import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { conn } from "./db/conexion.js";
import authRoutes from "./routes/auth.js";
import gameRoutes from "./routes/game.js";
dotenv.config();

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*", // or '*' for all origins
    credentials: false, // if you use cookies
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/game", gameRoutes);

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send(
    "<center><h1>Welcome to the Naomat API :D</h1></center><p>Hello world!</p>"
  );
});

conn
  .sync()
  .then(() => {
    app.listen(5000, () => {
      console.log("Server is running on http://localhost:5000");
    });
  })
  .catch((err) => console.log("Error creating DB: " + err));
