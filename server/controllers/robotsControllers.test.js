const Robot = require("../../database/models/robot");
const {
  getRobots,
  getRobotById,
  createRobot,
  deleteRobotbyId,
} = require("./robotsControllers");

jest.mock("../../database/models/robot");

describe("Given getRobots function", () => {
  describe("When it receives an object res", () => {
    test("Then it should call the method json and call method find", async () => {
      const res = {
        json: jest.fn(),
      };
      const robots = [
        {
          caracteristicas: {
            velocidad: 5,
            resistencia: 9,
            creacion: "1996-05-19T22:00:00.000Z",
          },
          _id: "61855ad154ce63991d588ddb",
          nombre: "Aire",
          imagen:
            "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/hc_1440x810/public/media/image/2020/04/astro-robot-ps5-1920415.jpg?h=d1cb525d&itok=NpaKRK-Q",
        },
        {
          caracteristicas: {
            velocidad: 3,
            resistencia: 10,
            creacion: "1996-05-19T22:00:00.000Z",
          },
          _id: "61857c0154ce63991d588ddc",
          nombre: "Oreo",
          imagen:
            "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/hc_1440x810/public/media/image/2020/04/astro-robot-ps5-1920415.jpg?h=d1cb525d&itok=NpaKRK-Q",
        },
      ];
      Robot.find = jest.fn().mockResolvedValue(robots);
      await getRobots(null, res);

      expect(Robot.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(robots);
    });
  });
});

describe("Given getRobotById function", () => {
  describe("When it receives an object res", () => {
    test("Then it should call the method json", async () => {
      const idRobot = "61855ad154ce63991d588ddb";
      const searchedRobot = {
        caracteristicas: {
          velocidad: 5,
          resistencia: 9,
          creacion: "1996-05-19T22:00:00.000Z",
        },
        idRobot,
        nombre: "Aire",
        imagen:
          "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/hc_1440x810/public/media/image/2020/04/astro-robot-ps5-1920415.jpg?h=d1cb525d&itok=NpaKRK-Q",
      };

      Robot.findById = jest.fn().mockResolvedValue(searchedRobot);

      const res = {
        json: jest.fn(),
      };

      const req = {
        params: { idRobot },
      };

      await getRobotById(req, res);

      expect(res.json).toHaveBeenCalledWith(searchedRobot);
    });
  });
  describe("When it receives an object res", () => {
    test("Then it should call the method find", async () => {
      const idRobot = "61855ad154ce63991d588ddb";
      Robot.findById = jest.fn().mockResolvedValue({});

      const res = {
        json: jest.fn(),
      };

      const req = {
        params: { idRobot },
      };

      await getRobotById(req, res);

      expect(Robot.findById).toHaveBeenCalledWith(idRobot);
    });
  });

  describe("When it receives an unknow id", () => {
    test("Then it should called next function with the error", async () => {
      const idRobot = "2";
      Robot.findById = jest.fn().mockResolvedValue(null);

      const res = {
        json: jest.fn(),
      };

      const req = {
        params: { idRobot },
      };

      const error = new Error("Id no encontrada");

      const next = jest.fn();

      await getRobotById(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When it receives a function next and rejected error", () => {
    test("Then it should called next function with the error object", async () => {
      const error = {
        code: 400,
      };
      Robot.findById = jest.fn().mockRejectedValue(error);

      const res = {
        json: jest.fn(),
      };
      const next = jest.fn();
      const req = {
        params: {},
      };

      await getRobotById(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given createRobot function", () => {
  describe("When it receives an object res, and req object", () => {
    test("Then it should call the method json with object", async () => {
      const robot = {
        caracteristicas: {
          velocidad: 3,
          resistencia: 10,
          creacion: "1996-05-19T22:00:00.000Z",
        },
        _id: "61857c0154ce63991d588ddc",
        nombre: "Oreo",
        imagen:
          "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/styles/hc_1440x810/public/media/image/2020/04/astro-robot-ps5-1920415.jpg?h=d1cb525d&itok=NpaKRK-Q",
      };
      const req = { body: robot };
      const res = {
        json: jest.fn(),
      };
      Robot.create = jest.fn().mockResolvedValue(robot);

      await createRobot(req, res);

      expect(Robot.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(robot);
    });
  });
  describe("When it receives a function next and rejected error", () => {
    test("Then it should called next function with the error object, and error.code is 400", async () => {
      const error = {};
      Robot.create = jest.fn().mockRejectedValue(error);

      const res = {
        json: jest.fn(),
      };
      const next = jest.fn();
      const req = {
        params: {},
      };

      await createRobot(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(error.code).toBe(400);
    });
  });
});

describe("Given deleteRobotbyId function", () => {
  describe("When it receives ", () => {
    test("Then it should call the method json without object", async () => {
      const idRobot = "61855ad154ce63991d588ddb";

      const req = { params: idRobot };
      const res = {
        id: idRobot,
        json: jest.fn(),
      };
      Robot.findByIdAndDelete = jest.fn().mockResolvedValue(res);
      const next = jest.fn();
      await deleteRobotbyId(req, res, next);

      expect(Robot.findByIdAndDelete).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalled();
    });
  });
  describe("When it receives a function next and rejected error", () => {
    test("Then it should called next function with the error object, and error.code is 400", async () => {
      const error = {};
      Robot.findByIdAndDelete = jest.fn().mockRejectedValue(error);

      const res = {
        json: jest.fn(),
      };
      const next = jest.fn();
      const req = {
        params: {},
      };

      await deleteRobotbyId(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(error.code).toBe(400);
    });
  });
});
