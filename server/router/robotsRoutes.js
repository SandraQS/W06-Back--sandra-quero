const express = require("express");
// const debug = require("debug")("robots:routes");
const {
  getRobots,
  getRobotById,
  createRobot,
  updateRobot,
  deleteRobotbyId,
} = require("../controllers/robotsControllers");

const checkToken = require("../middlewares/robotsMiddleware");

const router = express.Router();

router.get("/", getRobots);

router.get("/:idRobot", getRobotById);

router.post("/create", checkToken, createRobot);

router.put("/update", checkToken, updateRobot);

router.delete("/delete/:idRobot", checkToken, deleteRobotbyId);

module.exports = router;
