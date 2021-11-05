const { Schema, model } = require("mongoose");

const robotSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  imagen: {
    type: String,
    required: true,
  },
  caracteristicas: {
    type: Object,
    required: true,
    velocidad: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    resistencia: {
      type: Number,
      required: true,
      min: 0,
      max: 10,
    },
    creacion: {
      type: Date,
      required: true,
    },
  },
});

const Robot = model("Robot", robotSchema, "Robots");

module.exports = Robot;
