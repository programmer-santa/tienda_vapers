import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import routes from "./routes/routes.js"; // nuestras rutas

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());

// Rutas
app.use("/api", routes);

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
