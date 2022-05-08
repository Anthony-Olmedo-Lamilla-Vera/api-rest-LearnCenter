const ModelMateria = require("../Schemas/SchemaMateria");
const jwt = require("jsonwebtoken");

const MateriaDuplicadaUser = async (req, res, next) => {
  const { materias = [] } = req.body;
  const token = req.headers.authorization.slice(7);

  const clavePrivada = process.env.privateKeyToken;
  let filtrado = [];
  const tokenResp = jwt.verify(token, clavePrivada);
  try {
    materias.map(async (itemMateria) => {
      const populateMaterias = await ModelMateria.findOne({
        Nombre: itemMateria.Materia,
        Nivel: itemMateria.Semestre,
      });

      filtrado = populateMaterias.Estudiantes.filter(
        (itemfiltro) => itemfiltro.toJSON() === tokenResp.id
      );
    });

    if (filtrado.length === 0) {
      next();
    } else {
      res.status(403).send({
        msg: "ya se encuentra matriculado en esta materia",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(403).send({
      error,
    });
  }
};
module.exports = MateriaDuplicadaUser;
