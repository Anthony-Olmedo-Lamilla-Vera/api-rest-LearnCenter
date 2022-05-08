const { verify } = require("jsonwebtoken");
const ModelTarea = require("../Schemas/ModelTareas");
const modelUser = require("../Schemas/SchemaEstudent");
const ModelMateria = require("../Schemas/SchemaMateria");

async function AllDatosUser(req, res) {
  const { iduser } = req.params;

  const IdUser = verify(iduser, process.env.privateKeyToken);

  const usuario = await modelUser
    .findById(IdUser.id)
    .populate("Materias")
    .populate("Carrera");
  if (usuario !== null) {
    if (usuario.Categoria !== "Profesor") {
      const filterMateria = usuario.Materias.filter(async (materia) => {
        return await ModelMateria.findById(materia);
      });
      const Materias = await ModelMateria.find({
        _id: { $in: filterMateria },
      }).populate("Tareas");

      res.send({ usuario, Materias });
    } else {
      const Materias = await ModelMateria.find({ Docente: IdUser.id }).populate(
        "Tareas"
      );
      res.send({
        Materias,
        usuario,
      });
    }
  }
}
module.exports = AllDatosUser;
