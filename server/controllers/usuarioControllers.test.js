const usuario = require("../../database/models/users");
const { createUserToken } = require("./usuarioControllers");

jest.mock("../../database/models/users");

describe("Given createUserToken function", () => {
  describe("When it receives an req object, res objet and next function", () => {
    test("Then it should called the method findOne with true", async () => {
      const req = {
        body: {
          usuario: "ShivaShana",
          password: "hola",
        },
      };
      usuario.findOne = jest.fn().mockRejectedValue(req.body.usuario);
      const next = () => {};
      const res = { json: () => {} };

      await createUserToken(req, res, next);

      expect(usuario.findOne).toHaveBeenCalled();
    });
  });

  describe("When req.body.usuario unexist", () => {
    test("Then it should alled next function with the error", async () => {
      const req = {
        body: {
          usuario: "ShivaShana",
          password: "hola",
        },
      };
      usuario.findOne = jest.fn().mockResolvedValue(null);

      const next = jest.fn();
      const error = new Error("Algo ha fallado");

      await createUserToken(req, null, next);
      /*       exoect(next.mock.calls[0][0].toHaveProperty("message", "Algo ha fallado"))
       */ expect(next).toHaveBeenCalledWith(error);
    });
  });
});
