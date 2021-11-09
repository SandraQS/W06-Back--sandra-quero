const express = require("express");
const { createUserToken } = require("../controllers/usuarioControllers");

const router = express.Router();

router.post("/", createUserToken);

module.exports = router;
