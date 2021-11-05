const express = require("express");
// const debug = require("debug")("robots:routes");
const {
  getRobots,
  getRobotById,
  createRobot,
  updateRobot,
} = require("../controllers/robotsControllers");

const router = express.Router();

router.get("/", getRobots);

router.get("/:idRobot", getRobotById);

router.post("/create", createRobot);

router.put("/update", updateRobot);

module.exports = router;
