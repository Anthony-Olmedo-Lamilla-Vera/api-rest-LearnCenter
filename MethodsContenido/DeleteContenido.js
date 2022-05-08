const ModelContenido = require("../Schemas/Contenido");

async function DeleteContenido(req, res) {
  const { idcontent } = req.params;

  const Contenido = await ModelContenido.findByIdAndDelete(idcontent);
  res.status(200).send({ Contenido, msg: "Item Delete" });
}
module.exports = DeleteContenido;
