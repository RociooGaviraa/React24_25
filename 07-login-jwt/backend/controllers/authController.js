import jwt from "jsonwebtoken";
import User from "../models/User.js";

const login = async (req, res) => {
  const { username, password } = req.body;

  // Buscar el usuario en la base de datos
  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  // Generar un token JWT
  //Se genera un token JWT que contiene el ID del usuario (userId) y expira en 1 hora.
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // Enviar el token en una cookie HttpOnly
  /*
  - httpOnly: true: La cookie no puede ser accedida por JavaScript en el frontend, lo que la hace segura contra ataques XSS.

  - secure: true: La cookie solo se envía sobre conexiones HTTPS (en producción).

  - maxAge: 3600000: La cookie expira en 1 hora (3600000 milisegundos).

  - sameSite: 'strict': La cookie solo se envía en solicitudes del mismo sitio, lo que previene ataques CSRF.
  */
  res.cookie("token", token, {
    httpOnly: true, // La cookie solo es accesible por el servidor
    secure: process.env.NODE_ENV === "production", // Solo enviar sobre HTTPS en producción
    maxAge: 3600000, // Tiempo de expiración (1 hora)
    sameSite: "strict", // Prevenir ataques CSRF
  });

  res.json({ message: "Inicio de sesión exitoso" });
};
// Controlador para el registro de usuarios
const register = async (req, res) => {
  const { username, password } = req.body;

  // Verificar si el usuario ya existe
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: "El usuario ya existe" });
  }

  // Crear y guardar el nuevo usuario
  const user = new User({ username, password });
  await user.save();

  res.status(201).json({ message: "Usuario registrado" });
};

const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 0, // ✅ La cookie expira inmediatamente
  });
  res.json({ message: "Sesión cerrada exitosamente" });
};

// Exportar las funciones
export { login, logout, register };
