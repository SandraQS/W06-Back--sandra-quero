const express = require("express");
// const debug = require("debug")("robots:routes");
const { getRobots } = require("../controllers/robotsControllers");

const router = express.Router();

router.use("/", getRobots);

module.exports = router;
