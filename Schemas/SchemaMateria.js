const mongoose = require("mongoose");

const SchemaMateria = new mongoose.Schema({
  Nombre: String,
  Nivel: Number,
  Curso: String,
  Carrera: String,
  Docente: String,
  Estudiantes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  Tareas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tareas",
    },
  ],
  Contenidos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "contenidos",
    },
  ],
});
const ModelMateria = mongoose.model("materias", SchemaMateria);
module.exports = ModelMateria;
