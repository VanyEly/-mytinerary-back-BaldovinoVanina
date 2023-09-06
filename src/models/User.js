const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  photo: { type: String, required: true },
  country: {type: String, required: true },

});

const Usuario = mongoose.model("usuario", usuarioSchema);

module.exports = Usuario;