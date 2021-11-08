const express = require("express");
const { createUserToken } = require("../controllers/usuarioControllers");
const { authMidelware } = require("../middlewares/authMidelware");

// const { getUsuario } = require("../controllers/usuarioControllers");

const router = express.Router();

router.get("/", authMidelware, createUserToken);

module.exports = router;
