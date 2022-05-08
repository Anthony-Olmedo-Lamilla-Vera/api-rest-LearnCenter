const ModelMateria = require("../Schemas/SchemaMateria");

async function GetTareas(req, res) {
  const modelTareas = await ModelMateria.find({}).populate("Tareas");
  res.send({ modelTareas });
}
module.exports = GetTareas;
