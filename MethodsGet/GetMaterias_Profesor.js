const ModelMateria = require("../Schemas/SchemaMateria");

async function GetMaterias_Profesor(req, res) {
  const { idprofesor } = req.params;
  try {
    console.log(idprofesor);
    const materiasProfesor = await ModelMateria.find({ Docente: idprofesor });

    if (materiasProfesor.length === 0) {
      return res
        .status(400)
        .send({ msg: "No es profesor de ninguna materias" });
    }

    res.send({ materiasProfesor });
  } catch (error) {
    res.send({ error });
  }
}
module.exports = GetMaterias_Profesor;
