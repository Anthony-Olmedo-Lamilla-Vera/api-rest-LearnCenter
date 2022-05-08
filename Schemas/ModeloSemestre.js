const mongodb = require("mongoose");

const schemaSemestre = new mongodb.Schema({
  numeroSemestre: Number,
  IdCarrera: { type: mongodb.Schema.Types.ObjectId, ref: "materias" },
  Nombrecarrera: String,
  contenidoSemestre: [
    {
      type: mongodb.Schema.Types.ObjectId,
      ref: "materias",
    },
  ],
});
const ModeloSemestre = mongodb.model("semestres", schemaSemestre);
module.exports = ModeloSemestre;
