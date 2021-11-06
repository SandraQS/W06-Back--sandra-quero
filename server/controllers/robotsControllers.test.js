const Robot = require("../../database/models/robot");
const { getRobots } = require("./robotsControllers");

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
