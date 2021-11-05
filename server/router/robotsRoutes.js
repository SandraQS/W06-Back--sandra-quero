const express = require("express");
const debug = require("debug")("robots:routes");

const router = express.Router();

router.use("/", (req, res) => {
  debug("hola");
  res.json({ nombre: "hola" });
});

module.exports = router;
