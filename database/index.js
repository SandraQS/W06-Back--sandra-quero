const chalk = require("chalk");
const mongoose = require("mongoose");
const debug = require("debug")("robots:database");

const initDB = (conectionDBString) =>
  new Promise((resolve, reject) => {
    mongoose.connect(conectionDBString, (error) => {
      if (error) {
        debug(chalk.red("No se ha podido conectar con la base de datos... :("));
        debug(chalk.red(error.message));
        reject();
        return;
      }
      debug(chalk.green("Se ha conectado con la base de datos"));
      resolve();
    });

    mongoose.connection.on("close", () => {
      debug(chalk.green("La base de datos se ha desconectado"));
    });
  });

module.exports = initDB;
