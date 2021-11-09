const express = require("express");
const { validate } = require("express-validation");
const { createUserToken } = require("../controllers/usuarioControllers");
const loginValidation = require("../schemas/usersSchemas");

const router = express.Router();

router.post("/", validate(loginValidation), createUserToken);

module.exports = router;
