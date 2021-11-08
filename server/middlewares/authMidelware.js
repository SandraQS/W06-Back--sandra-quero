const jwt = require("jsonwebtoken");

const authMidelware = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    const error = new Error("No estás autorizado");
    error.code = 401;
    next(error);
  } else {
    const token = authHeader.split(" ")[1];
    console.log(token);
    if (!token) {
      const error = new Error("No existe");
      error.code = 401;
      next(error);
    } else {
      try {
        const authOk = jwt.verify(token, process.env.SECRET_TOKEN);
        req.userId = authOk.id;
        next();
      } catch (error) {
        error.message = "Token incorrecto";
        error.code = 401;
        next(error);
      }
    }
  }
};

module.exports = {
  authMidelware,
};
