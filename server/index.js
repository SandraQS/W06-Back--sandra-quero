const express = require("express");
const debug = require("debug")("robots:server");
const chalk = require("chalk");

const app = express();

const initServer = (port) => {
  const server = app.listen(port, () => {
    debug(chalk.yellow(`Escuchando en el puerto ${port}`));
  });

  server.on("error", (error) => {
    debug(chalk.red(`ERROR! Ha habido un error al iniciar el servidor`));

    if (error.code === "EADDRINUSE") {
      debug(chalk.red(`El puerto está ocupado`));
    }
  });
};

module.exports = initServer;
