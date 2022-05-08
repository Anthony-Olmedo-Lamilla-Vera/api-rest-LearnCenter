const modelEntregasTarea = require("../Schemas/ModelEntrega");
const EntregaTarea = require("./EntregaTarea");

async function CalificarTareas(req, res) {
  try {
    const { idEntrega } = req.params;
    const { nota, observacion = "sin observacion" } = req.body;
    const CalificarTareas = await modelEntregasTarea.findByIdAndUpdate(
      idEntrega,
      {
        EstadoEntrega: "Calificado",
        Nota: nota,
        Observacion: observacion,
      }
    );
    res.status(200).send({ msg: "Actualizado" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Error Intente nuevamente", error });
  }
}
module.exports = CalificarTareas;
