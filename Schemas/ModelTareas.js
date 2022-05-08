const { Schema, model } = require("mongoose");

const SchemaTarea = new Schema({
  Nombre: String,
  FechaPublicacion: Date,
  FechaLimite: String,
  Estado: String,
  Descripcion: String,
  Documentos: [
    {
      type: Schema.Types.ObjectId,
      ref: "documentos",
    },
  ],
  Entregas: [
    {
      type: Schema.Types.ObjectId,
      ref: "Entregas-tareas",
    },
  ],
});

const ModelTarea = model("tareas", SchemaTarea);
module.exports = ModelTarea;
