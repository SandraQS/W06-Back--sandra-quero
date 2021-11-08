const { Schema, model } = require("mongoose");

const usuarioSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  usuario: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const usuario = model("usuario", usuarioSchema, "usuarios");

module.exports = usuario;
