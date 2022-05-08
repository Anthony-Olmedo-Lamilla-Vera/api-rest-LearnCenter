const mongodb = require("mongoose");

const schemaCarrera = new mongodb.Schema({
  NombreCarrera: String,
  NumeroSemestres: Number,
  ContenidoCarrera: [
    {
      type: mongodb.Schema.Types.ObjectId,
      ref: "semestres",
    },
  ],
  Estudiantes: [
    {
      type: mongodb.Schema.Types.ObjectId,
      ref: "users",
      unique: true,
    },
  ],
});
const modeloCarrera = mongodb.model("carreras", schemaCarrera);
module.exports = modeloCarrera;
