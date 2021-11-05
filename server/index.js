const express = require("express");
const debug = require("debug")("robots:server");

const app = express();

const initServer = (port) => {
  const server = app.listen(port, () => {
    debug(`Escuchando en el puerto ${port}`);
  });

  server.on("error", (error) => {
    debug(`Ha habido un error al iniciar el servidor`, error.message);
  });
};

module.exports = initServer;
