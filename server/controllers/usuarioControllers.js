const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

const createUserToken = async (req, res, next) => {
  const { usuario, password } = req.body;
  try {
    const user = await Usuario.findOne({ usuario });
    if (!user) {
      const error = new Error("Algo ha fallado");
      error.code = 401;
      next(error);
    } else {
      const passExist = await bcrypt.compare(password, user.password);
      console.log(passExist);
      if (!passExist) {
        const error = new Error("Algo ha fallado");
        error.code = 401;
        next(error);
      } else {
        const token = jwt.sign({ user, id: user.id }, process.env.SECRET_TOKEN);

        res.json({ token });
      }
    }
  } catch (error) {
    error.message = "No autorizado";
    error.code = 401;
    next(error);
  }
};

module.exports = {
  createUsuario,
  createUserToken,
};
