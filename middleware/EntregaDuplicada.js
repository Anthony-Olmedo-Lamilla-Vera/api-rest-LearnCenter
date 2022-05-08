const { verify } = require("jsonwebtoken");
const modelEntregasTarea = require("../Schemas/ModelEntrega");
const ModelTarea = require("../Schemas/ModelTareas");

async function EntregaDuplicada(req, res, next) {
  const token = req.headers.authorization.slice(7);

  const IdUser = verify(token, process.env.privateKeyToken);
  const { idtarea } = req.body;
  const ModelTareas = await ModelTarea.findById(idtarea);
  const Entrega = await modelEntregasTarea.find({
    Estudiante: IdUser.id,
    _id: { $in: ModelTareas.Entregas },
  });
  if (Entrega.length > 0) {
    res.status(401).send({
      msg: "Ya hiciste una Entrega ",
      msg2: "tienes muchas entregas",
      Entrega,
    });
  } else {
    next();
  }
}
module.exports = EntregaDuplicada;
