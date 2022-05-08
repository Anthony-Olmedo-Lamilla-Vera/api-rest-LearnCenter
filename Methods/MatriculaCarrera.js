const { verify } = require("jsonwebtoken");
const modeloCarrera = require("../Schemas/ModeloCarrera");
const modelUser = require("../Schemas/SchemaEstudent");

async function MatriculaCarrera(req, res) {
  const { carrera, token } = req.body;

  try {
    const idUser = verify(token, process.env.privateKeyToken);
    console.log(idUser);
    const modelusuario = await modelUser.findById(idUser.id);
    const modelCarrera = await modeloCarrera.findOne({
      NombreCarrera: carrera,
    });
    modelCarrera.Estudiantes = modelCarrera.Estudiantes.concat(
      modelusuario._id
    );
    await modelCarrera.save();
  } catch (error) {
    return res.send({ error });
  }

  res.send({ msg: "Matriculado" });
}
module.exports = MatriculaCarrera;
