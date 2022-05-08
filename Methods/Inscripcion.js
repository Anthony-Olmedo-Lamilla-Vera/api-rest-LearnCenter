const modelUser = require("../Schemas/SchemaEstudent");
const ModelMateria = require("../Schemas/SchemaMateria");
const jwt = require("jsonwebtoken");
const Inscripcion = async (req, res) => {
  const { materias } = req.body;
  const token = req.headers.authorization.slice(7);
  try {
    const dataToken = jwt.verify(token, process.env.privateKeyToken);
    const estudiantes = await modelUser
      .findById(dataToken.id)
      .populate("Materias");
    console.log(dataToken);
    if (estudiantes !== null) {
      const promises = materias.map(async (itemMateria) => {
        const populateMaterias = await ModelMateria.findOne({
          Nombre: itemMateria.Materia,
          Nivel: itemMateria.Semestre,
        });

        if (populateMaterias.Estudiantes !== null) {
          populateMaterias.Estudiantes = populateMaterias.Estudiantes.concat(
            estudiantes._id
          );
          estudiantes.Materias = estudiantes.Materias.concat(
            populateMaterias._id
          );
        }
        estudiantes.Semestre = itemMateria.Semestre;
        await populateMaterias.save();
        await estudiantes.save();
      });

      return res.status(200).send({
        msg: "Matriculada correctamente en la materia ",
        estudiantes,
      });
    } else {
      return res.status(400).send({
        msg: "No existe este usuario o no esta permitido ",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
module.exports = Inscripcion;
