const express = require("express");
const { createUsuario } = require("../controllers/usuarioControllers");

// const { getUsuario } = require("../controllers/usuarioControllers");

const router = express.Router();

router.get("/", createUsuario);

module.exports = router;
