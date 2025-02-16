import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Definir el esquema del usuario
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Middleware de Mongoose: Encriptar la contraseña antes de guardar
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10); // Encriptar con bcrypt
  }
  next();
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Exportar el modelo de usuario
export default mongoose.model("User", userSchema);
