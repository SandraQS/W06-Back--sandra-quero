const debug = require("debug")("robots:errors");
const chalk = require("chalk");

const handlerNotFound = (req, res) => {
  res.status(404).json({ error: "El endpoint no funciona" });
};

// eslint-disable-next-line no-unused-vars
const handlerGeneralError = (error, req, res, next) => {
  debug(chalk.red("Ha ocurrido un error: ", error.message));
  const message = error.code ? error.message : "ERROR";
  res.status(error.code || 500).json({ error: message });
};

module.exports = {
  handlerNotFound,
  handlerGeneralError,
};
