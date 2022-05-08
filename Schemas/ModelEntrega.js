const { Schema, model } = require("mongoose");
const SchemaTarea = new Schema({
  FechaEntrega: Date,
  Estudiante: { type: Schema.Types.ObjectId, ref: "users" },
  Nota: String,
  URLEntrega: String,
  EstadoEntrega: String,
  Entregado: String,
  Observacion: String,
  Tarea: { type: Schema.Types.ObjectId, ref: "tareas" },
});
const modelEntregasTarea = model("Entregas-tareas", SchemaTarea);
module.exports = modelEntregasTarea;
