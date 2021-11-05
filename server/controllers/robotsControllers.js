const debug = require("debug")("robots:controllers");

const getRobots = async (req, res) => {
  debug("hola");
  res.json({ nombre: "saleeee" });
};

module.exports = {
  getRobots,
};
