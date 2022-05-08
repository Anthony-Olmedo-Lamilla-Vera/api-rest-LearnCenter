const { Schema, model } = require("mongoose");
const SchemaDoc = new Schema({
  URLdocumento: String,
  TituloDocumento: String,
});
const modelDocumentos = model("documentos", SchemaDoc);

module.exports = modelDocumentos;
