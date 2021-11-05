const debug = require("debug")("robots:controllers");
const Robot = require("../../database/models/robot");

const getRobots = async (req, res) => {
  const robots = await Robot.find();
  debug("hola");
  res.json(robots);
};

const getRobotById = async (req, res) => {
  const { idRobot } = req.params;
  console.log(req.params);
  const searchedRobot = await Robot.findById(idRobot);
  res.json(searchedRobot);
};

module.exports = {
  getRobots,
  getRobotById,
};
