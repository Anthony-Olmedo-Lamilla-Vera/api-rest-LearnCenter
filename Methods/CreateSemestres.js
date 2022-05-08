const { default: mongoose } = require("mongoose");
const modeloCarrera = require("../Schemas/ModeloCarrera");
const ModeloSemestre = require("../Schemas/ModeloSemestre");

const createSemestres = async (req, res) => {
  const numeroSemestre = 5;

  const carrera = modeloCarrera.find({});
  try {
    (await carrera).map(async (itemCarrera) => {
      for (let index = 0; index < numeroSemestre; index++) {
        const Semestre = ModeloSemestre({
          numeroSemestre: index + 1,
          Nombrecarrera: itemCarrera.NombreCarrera,
          IdCarrera: itemCarrera._id,
        });
        itemCarrera.ContenidoCarrera = itemCarrera.ContenidoCarrera.concat(
          Semestre._id
        );

        await Semestre.save();
        await itemCarrera.save();
      }
    });
    const modeloCarr = await modeloCarrera
      .find({})
      .populate("ContenidoCarrera");

    res.send({
      modeloCarr,
    });
  } catch (error) {}
};
module.exports = createSemestres;
