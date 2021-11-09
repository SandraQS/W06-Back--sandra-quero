require("dotenv").config();
const { initServer } = require("./server/index");
const initDB = require("./database/index");

const port = process.env.PORT ?? process.env.SERVER_PORT ?? 2000;

initDB(process.env.MONGODB_STRING_ROBOTS);
initServer(port);
