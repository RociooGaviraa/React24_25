import express from "express";
import { login, logout, register } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Rutas de autenticación
router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);

router.get("/check-auth", authMiddleware, (req, res) => {
  res.status(200).json({ message: "Autenticado", userId: req.userId });
});

export default router;
