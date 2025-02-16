import express from "express";
import { addUser, getUserProfile } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// Ruta para añadir usuarios (protegida por autenticación)
router.post("/", addUser);

// ✅ Nueva ruta para obtener información del usuario autenticado
router.get("/me", authMiddleware, getUserProfile);

export default router;
