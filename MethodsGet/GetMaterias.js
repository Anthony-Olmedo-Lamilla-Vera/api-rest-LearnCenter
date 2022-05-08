const ModeloSemestre = require("../Schemas/ModeloSemestre");

async function GetMaterias(req, res) {
  const modeloMaterias = await ModeloSemestre.find({}).populate(
    "contenidoSemestre"
  );
  let header = req.headers.authorization;
  res.send({ header });
}
module.exports = GetMaterias;
