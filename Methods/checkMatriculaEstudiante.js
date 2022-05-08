const { verify } = require("jsonwebtoken");
const modeloCarrera = require("../Schemas/ModeloCarrera");

const checkMatriculaEstudiante = async (req, res, next) => {
  const { carrera } = req.body;
  try {
    const token = req.headers.authorization.slice(7);
    const idUser = verify(token, process.env.privateKeyToken);
    const modeloCarrer = await modeloCarrera.findOne({
      NombreCarrera: carrera,
    });
    const duplicados = [];

    const DuplicateMatricula = await modeloCarrera.find({});
    DuplicateMatricula.map((itemmatric) => {
      const Filtr = itemmatric.Estudiantes.filter(
        (Estudiante) => Estudiante.toJSON() === idUser.id
      );
      if (Filtr.length !== 0) {
        duplicados.push(Filtr);
      }
    });
    console.log(duplicados);
    if (duplicados.length === 0) {
      return next();
    } else {
      res.send({ msg: "Ya estas matriculado en otra carrera" });
    }
  } catch (error) {
    res.send({ error });
  }
};
module.exports = checkMatriculaEstudiante;
