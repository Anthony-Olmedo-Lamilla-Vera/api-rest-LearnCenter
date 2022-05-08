const ModelTarea = require("../Schemas/ModelTareas");

async function EditTare(req, res) {
  const { idtarea } = req.body;
  try {
    const tareaid = await ModelTarea.findById(idtarea);
    if (tareaid !== null) {
      const tareas = await ModelTarea.findByIdAndUpdate(idtarea, {
        Nombre: "Update tarea",
      });
      const tarea = await ModelTarea.findById(idtarea);
      res.send({ tarea });
    } else {
      res.send({ msg: "No existe id Tarea" });
    }
  } catch (error) {
    res.send({ error });
  }
}
module.exports = EditTare;
