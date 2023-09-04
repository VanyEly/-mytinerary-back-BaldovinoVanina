const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  primerNombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true },
  contraseña: { type: String, required: true },
  fotoPerfil: { type: String, required: true },
  pais: {type: String, required: true },
  google:{type:Boolean, default:false},
  rol: { type: String, default:'usuario' },

});

const Usuario = mongoose.model("usuario", usuarioSchema);

module.exports = Usuario;