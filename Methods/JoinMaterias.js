const ModeloSemestre = require("../Schemas/ModeloSemestre");
const ModelMateria = require("../Schemas/SchemaMateria");

const JoinMaterias = async (req, res) => {
  const SemestreMateria = await ModeloSemestre.find({});
  SemestreMateria.map(async (materiaSemestre) => {
    const materiasTodo = await ModelMateria.find({
      Carrera: materiaSemestre.Nombrecarrera,
      Nivel: materiaSemestre.numeroSemestre,
    });
    if (materiasTodo.length > 0) {
      materiasTodo.map(async (item) => {
        materiaSemestre.contenidoSemestre =
          materiaSemestre.contenidoSemestre.concat(item._id);
        await materiaSemestre.save();
      });
    }
  });
  const populate = await ModeloSemestre.find({}).populate("contenidoSemestre");
  res.send({ populate });
};
module.exports = JoinMaterias;
