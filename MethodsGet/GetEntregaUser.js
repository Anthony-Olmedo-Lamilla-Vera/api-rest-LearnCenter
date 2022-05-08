const { verify } = require("jsonwebtoken");
const modelEntregasTarea = require("../Schemas/ModelEntrega");
const ModelTarea = require("../Schemas/ModelTareas");

async function GetEntregaUser(req, res) {
  try {
    const token = req.headers.authorization.slice(7);
    const IdUser = verify(token, process.env.privateKeyToken);
    const { idTarea } = req.params;
    const ModelTareas = await ModelTarea.findById(idTarea).populate(
      "Documentos"
    );
    const Entrega = await modelEntregasTarea
      .find({ Estudiante: IdUser.id, _id: { $in: ModelTareas.Entregas } })
      .populate("Estudiante");

    if (Entrega.length > 1) {
      res.status(401).send({
        msg: "Ya hiciste una Entrega ",
        msg2: "tienes muchas entregas",
        Entrega,
      });
    }
    res.status(200).send({ Entrega, ModelTareas });
  } catch (error) {
    console.log(error);
    res.status(401).send({ error });
  }
}
module.exports = GetEntregaUser;
