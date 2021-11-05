const chalk = require("chalk");
const mongoose = require("mongoose");
const debug = require("debug")("robots:database");

const initDB = () => {
  mongoose.connect(process.env.MONGODB_STRING_ROBOTS, (error) => {
    if (error) {
      debug(chalk.red("No se ha podido conectar con la base de datos... :("));
      debug(chalk.red(error.message));
      return;
    }
    debug(chalk.green("Se ha conectado con la base de datos"));
  });
};

module.exports = initDB;
