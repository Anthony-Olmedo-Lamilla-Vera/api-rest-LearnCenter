const modeloCarrera = require("../Schemas/ModeloCarrera");
const ModeloSemestre = require("../Schemas/ModeloSemestre");

const GetMateriaID = async (req, res) => {
  const { idCarrera } = req.params;

  const ContenidoCarrera = await modeloCarrera
    .findById(idCarrera)
    .populate("ContenidoCarrera");

  const MateriaSemestres = await ModeloSemestre.find({
    IdCarrera: idCarrera,
  }).populate("contenidoSemestre");
  if (MateriaSemestres === null) {
    res.status(400).send({ msg: "No existe esta materia y/o semestre" });
  }
  res.status(200).send({ ContenidoCarrera, MateriaSemestres });
};
module.exports = GetMateriaID;
