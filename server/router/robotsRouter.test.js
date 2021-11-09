require("dotenv").config();
const mongoose = require("mongoose");
const supertest = require("supertest");
const chalk = require("chalk");
const debug = require("debug");
const initDB = require("../../database/index");
const { app, initServer } = require("../index");
const Robot = require("../../database/models/robot");

const request = supertest(app);
let server;
let token;

beforeEach(async () => {
  await initDB(process.env.MONGODB_STRING_ROBOTS_TESTS);
  server = await initServer(4009);
  const response = await request
    .post("/login")
    .send({ usuario: "ShivaShana", password: "hola" })
    .expect(200);
  token = response.body.token;
  await Robot.deleteMany({});
  await Robot.create({
    caracteristicas: {
      velocidad: 2,
      resistencia: 4,
      creacion: "1996-05-19T22:00:00.000Z",
    },
    _id: "61858e30ac133f67ed347cb2",
    nombre: "Yoshi",
    imagen:
      "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/hc_1440x810/public/media/image/2020/04/astro-robot-ps5-1920415.jpg?h=d1cb525d&itok=NpaKRK-Q",
    __v: 0,
  });
  await Robot.create({
    caracteristicas: {
      velocidad: 5,
      resistencia: 9,
      creacion: "1996-05-19T22:00:00.000Z",
    },
    _id: "61858db7ac133f67ed347cae",
    nombre: "Kovu",
    imagen:
      "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/hc_1440x810/public/media/image/2020/04/astro-robot-ps5-1920415.jpg?h=d1cb525d&itok=NpaKRK-Q",
    __v: 0,
  });
});

afterAll(async () => {
  await mongoose.connection.on("close", () => {
    debug(chalk.red("Database connection ended"));
  });
  await mongoose.connection.close();
  await server.on("close", () => {
    debug(chalk.red("Server conection ended"));
  });
  await server.close();
});

describe("Given /robots route", () => {
  describe("When it  receives a get request", () => {
    test("Then it should sent a response with a array", async () => {
      const { body } = await request
        .get("/robots")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);
      const expectLength = 2;
      const expectRobot1 = {
        caracteristicas: {
          velocidad: 2,
          resistencia: 4,
          creacion: "1996-05-19T22:00:00.000Z",
        },
        _id: "61858e30ac133f67ed347cb2",
        nombre: "Yoshi",
        imagen:
          "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/hc_1440x810/public/media/image/2020/04/astro-robot-ps5-1920415.jpg?h=d1cb525d&itok=NpaKRK-Q",
        __v: 0,
      };
      // Hay que comprobar que devuelve un array.
      expect(body).toHaveLength(expectLength);
      expect(body).toContainEqual(expectRobot1);
    });
  });
});
