import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// Configuración de CORS (Express maneja CORS, no Nginx)
const allowedOrigins = [
  "http://localhost:5174",
  "http://tu-dominio.com",
  "http://localhost:5173",
];

// --------- no consigo que funciones ---------
// app.use(
//   cors({
//     origin: "*", // ⚠️ Esto permite que cualquier frontend se conecte
//     credentials: true,// Permitir cookies
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin);
      } else {
        callback(new Error("No permitido por CORS"));
      }
    },
    credentials: true, // Permitir cookies
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());

// Conectar a MongoDB
connectDB();

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

export default app;
