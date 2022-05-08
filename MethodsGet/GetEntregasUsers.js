const modelEntregasTarea = require("../Schemas/ModelEntrega");
const ModelTarea = require("../Schemas/ModelTareas");
const modelUser = require("../Schemas/SchemaEstudent");

async function GetEntregasUser(req, res) {
  const { idTarea } = req.params;
  const tareaEntregas = await modelEntregasTarea
    .find({ Tarea: idTarea })
    .populate("Tarea")
    .populate("Estudiante");

  res.send(tareaEntregas);
}
module.exports = GetEntregasUser;
