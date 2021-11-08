const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const Usuario = require("../../database/models/users");

const createUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.create({
      nombre: "Sandra",
      usuario: "ShivaShana",
      password: await bcrypt.hash("hola", 10),
    });
    res.json(usuario);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const createUserToken = (req, res, next) => {
  const { usuario, password } = req.body;
  if (!usuario) {
    const error = new Error("Usuario no encontrado");
    error.code = 401;
    next(error);
  } else {
    // const token = jwt.
  }
};

module.exports = {
  createUsuario,
  createUserToken,
};
