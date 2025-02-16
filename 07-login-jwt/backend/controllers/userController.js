import User from "../models/User.js";

// Controlador para añadir usuarios (protegido por autenticación)
const addUser = async (req, res) => {
  const { username, password } = req.body;

  // Crear y guardar el nuevo usuario
  const user = new User({ username, password });
  await user.save();

  res.status(201).json({ message: "Usuario añadido" });
};
// ✅ Nuevo controlador para obtener el perfil del usuario autenticado
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password"); // Excluir la contraseña
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json({ id: user._id, username: user.username });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los datos del usuario" });
  }
};

export { addUser, getUserProfile };
