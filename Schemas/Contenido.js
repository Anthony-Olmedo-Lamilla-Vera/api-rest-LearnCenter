const mongoose = require("mongoose");

const schemaContenido = new mongoose.Schema({
  Tipo: String,
  Titulo: String,
  Descripcion: String,
  Documento: String,
  idTarea: String,
});
const ModelContenido = mongoose.model("contenidos", schemaContenido);

module.exports = ModelContenido;
