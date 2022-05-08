const modeloCarrera = require("../Schemas/ModeloCarrera");
const AlgoritmosMaterias = require("./AlgoritmoMaterias");

const CreateCarrera = async (req, res) => {
  const { nombreCarrera, numeroSemestre } = req.body;

  AlgoritmosMaterias().forEach(async (itemMateria) => {
    const materia = modeloCarrera({
      NombreCarrera: itemMateria.carrera,
      NumeroSemestres: itemMateria.numeroSemestres,
    });

    await materia.save();
  });
  const carreras = await modeloCarrera.find({});
  res.send({ carreras });
};
module.exports = CreateCarrera;
