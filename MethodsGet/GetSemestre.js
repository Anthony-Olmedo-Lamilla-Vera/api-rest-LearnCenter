const ModeloSemestre = require("../Schemas/ModeloSemestre");

async function GetSemestre(req, res) {
  const modelSemestre = await ModeloSemestre.find({}).populate(
    "contenidoSemestre"
  );
  res.send({ modelSemestre });
}
module.exports = GetSemestre;
