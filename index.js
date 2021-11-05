require("dotenv").config();
const initServer = require("./server/index");

const port = process.env.PORT ?? process.env.SERVER_PORT ?? 2000;
initServer(port);
