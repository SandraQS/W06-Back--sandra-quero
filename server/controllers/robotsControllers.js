const debug = require("debug")("robots:controllers");
const Robot = require("../../database/models/robot");

const getRobots = async (req, res) => {
  const robots = await Robot.find();
  debug("hola");
  res.json(robots);
};

module.exports = {
  getRobots,
};
