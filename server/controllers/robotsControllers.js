const Robot = require("../../database/models/robot");

const getRobots = async (req, res) => {
  const robots = await Robot.find();
  res.json(robots);
};

const getRobotById = async (req, res, next) => {
  const { idRobot } = req.params;
  try {
    const searchedRobot = await Robot.findById(idRobot);
    if (searchedRobot) {
      res.json(searchedRobot);
    } else {
      const error = new Error("Id no encontrada");
      error.code = 404;
      throw error;
    }
  } catch (error) {
    error.code = 400;
    next(error);
  }
};

const createRobot = async (req, res, next) => {
  try {
    const robot = req.body;
    const newRobot = await Robot.create(robot);
    res.json(newRobot);
  } catch (error) {
    error.code = 400;
    error.message = "Objeto no váido";
    next(error);
  }
};

const updateRobot = async (req, res, next) => {
  try {
    const { _id } = req.body;
    const updateRobotById = await Robot.findByIdAndUpdate(_id, req.body, {
      runValidators: true,
    });
    res.json(updateRobotById);
  } catch (error) {
    error.code = 400;
    error.message = "Parece que algo ha fallado, revisa los datos introducidos";
    next(error);
  }
};

const deleteRobotbyId = async (req, res, next) => {
  try {
    const { idRobot } = req.params;
    await Robot.findByIdAndDelete(idRobot);
    res.json({ id: idRobot });
  } catch (error) {
    error.code = 400;
    error.message = "Esta id no existe";
    next(error);
  }
};

module.exports = {
  getRobots,
  getRobotById,
  createRobot,
  updateRobot,
  deleteRobotbyId,
};
