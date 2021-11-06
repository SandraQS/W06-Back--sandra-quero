require("dotenv").config();

const token = process.env.TOKEN;

const checkToken = (req, res, next) => {
  if (token === req.query.token) {
    next();
  } else {
    const error = new Error("Necesitas introducir un token correcto");
    error.code = 401;
    throw error;
  }
};

module.exports = checkToken;
