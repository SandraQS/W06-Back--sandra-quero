const { Joi } = require("express-validation");

const loginValidation = {
  body: Joi.object({
    usuario: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

module.exports = loginValidation;
