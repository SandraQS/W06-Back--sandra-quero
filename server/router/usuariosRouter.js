const express = require("express");
const { createUserToken } = require("../controllers/usuarioControllers");
const { authMidelware } = require("../middlewares/authMidelware");

const router = express.Router();

router.post("/", authMidelware, createUserToken);

module.exports = router;
