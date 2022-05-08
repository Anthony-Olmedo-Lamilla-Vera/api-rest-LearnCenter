const ModelContenido = require("../Schemas/Contenido");
const ModelMateria = require("../Schemas/SchemaMateria");

async function CreateContent(req, res) {
  const { tipo, titulo, contenido, idmateria } = req.body;
  try {
    const modelMaterias = await ModelMateria.findById(idmateria).populate(
      "Contenidos"
    );
    if (tipo === "aviso") {
      const Item = ModelContenido({
        Tipo: tipo,
        Titulo: titulo,
        Descripcion: contenido,
      });
      modelMaterias.Contenidos = modelMaterias.Contenidos.concat(Item._id);
      await Item.save();
      await modelMaterias.save();

      res.status(200).send({
        msg: "Guardado Aviso ",
        data: Item,
      });
    } else if (tipo === "archivo") {
      const Item = ModelContenido({
        Tipo: tipo,
        Titulo: titulo,
        Descripcion: contenido,
        Documento: "URLDOC",
      });
      res.status(200).send({
        msg: "Archivo guardado ! ",
        data: Item,
      });
      modelMaterias.Contenidos = modelMaterias.Contenidos.concat(Item._id);
      await Item.save();
      await modelMaterias.save();
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({ msg: "No existe esta materia", error });
  }
}
module.exports = CreateContent;
