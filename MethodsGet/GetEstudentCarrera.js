const modeloCarrera = require("../Schemas/ModeloCarrera");

const GetEstudianteCarrera = async (req, res) => {
  const populateEstudiante = await modeloCarrera
    .find({})
    .populate("Estudiantes");
  res.send({ populateEstudiante });
};
module.exports = GetEstudianteCarrera;
