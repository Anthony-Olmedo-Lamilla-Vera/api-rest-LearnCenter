const EntregaTarea = require("../MethodsTareas/EntregaTarea");
const modelEntregasTarea = require("../Schemas/ModelEntrega");
const ModelTarea = require("../Schemas/ModelTareas");

async function GetEntregasTareas(req, res) {
  const Tarea = await ModelTarea.find({}).populate("Entregas");
  const Entrega = await modelEntregasTarea.find({}).populate("Estudiante");
  res.send({ Entrega });
}
module.exports = GetEntregasTareas;
