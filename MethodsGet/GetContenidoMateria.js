const ModelMateria = require("../Schemas/SchemaMateria");
const jwt = require("jsonwebtoken");

async function GetContenidoMateria(req, res) {
  const token = req.headers.authorization.slice(7);

  const userjwt = jwt.verify(token, process.env.privateKeyToken);

  const { idmateria } = req.params;

  try {
    const materia = await ModelMateria.findById(idmateria).populate(
      "Contenidos"
    );

    const find = materia.Estudiantes.find((estudiante) => {
      return estudiante.toJSON() === userjwt.id;
    });

    if (materia.Docente === userjwt.id || find !== undefined) {
      return res.status(200).send({ materia, userjwt });
    }

    res.send({ msg: "No tienes permiso para ver el contenido", userjwt });
  } catch (error) {
    res.status(400).send({ msg: "Error no tiene permisos de usuario" });
  }
}
module.exports = GetContenidoMateria;
