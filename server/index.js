const express = require("express");
const cors = require("cors");
const debug = require("debug")("robots:server");
const chalk = require("chalk");
const morgan = require("morgan");
const robotsRoutes = require("./router/robotsRoutes");
const usuariosRouter = require("./router/usuariosRouter");
const { handlerNotFound, handlerGeneralError } = require("./error");
const { authMidelware } = require("./middlewares/authMidelware");

const app = express();

app.use(cors());
app.use(express());

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

app.use(morgan("dev"));
app.use(express.json());
app.use("/login", usuariosRouter);
app.use("/robots", authMidelware, robotsRoutes);
app.use(handlerNotFound);
app.use(handlerGeneralError);

module.exports = initServer;
