const { verify } = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const modelUser = require("../Schemas/SchemaEstudent");
const ModelMateria = require("../Schemas/SchemaMateria");

async function MateriaProfesor(req, res) {
  const { idMateria, nivel } = req.body;

  try {
    const token = req.headers.authorization.slice(7);
    const verifyToken = verify(token, process.env.privateKeyToken);

    const materia = await ModelMateria.findOne({
      _id: idMateria,
      Nivel: nivel,
    });

    const profesor = await modelUser.findById(verifyToken.id);

    if (materia !== null) {
      materia.Docente = profesor.id;
      profesor.Materias = profesor.Materias.concat(materia);
      await materia.save();
      await profesor.save();
      return res.send({ materia });
    } else {
      return res.send({
        msg: "no existe esta materia o no tiene permitido ",
        materia,
      });
    }
  } catch (error) {
    res.send({ error });
  }
}
module.exports = MateriaProfesor;
