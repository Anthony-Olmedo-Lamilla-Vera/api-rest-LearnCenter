const { default: mongoose } = require("mongoose");
const ModelTarea = require("../Schemas/ModelTareas");
const multer = require("multer");
const modelDocumentos = require("../Schemas/SchemaDocUpload");
const modelUser = require("../Schemas/SchemaEstudent");
const ModelMateria = require("../Schemas/SchemaMateria");
const { verify } = require("jsonwebtoken");
const upload = require("../middleware/FilesMid");
const ModelContenido = require("../Schemas/Contenido");
const cloudinary = require("cloudinary").v2;

const CrearTareas = async (req, res) => {
  const { Nombre, fechaLimite, materia, nivel, descripcion } = req.body;
  try {
    const token = req.headers.authorization.slice(7);
    const verifyToken = verify(token, process.env.privateKeyToken);
    const estudiante = await modelUser.findById(verifyToken.id);
    const materias = await ModelMateria.findOne({
      Nombre: materia,
      Nivel: nivel,
    }).populate("Tareas");
    var urlImg;

    await cloudinary.uploader
      .upload(req.file.path)
      .then((res) => (urlImg = res.url));

    if (materias !== null) {
      if (materias.Docente === verifyToken.id) {
        const documents = modelDocumentos({
          URLdocumento: urlImg,
          TituloDocumento: req.file.originalname,
        });
        const docGuardado = await documents.save();
        const modelTarea = ModelTarea({
          Nombre: Nombre,
          FechaPublicacion: new Date(),
          FechaLimite: fechaLimite,
          Descripcion: descripcion,
        });
        modelTarea.Documentos = modelTarea.Documentos.concat(docGuardado._id);
        const materiaGuardada = await modelTarea.save();

        materias.Tareas = materias.Tareas.concat(materiaGuardada._id);

        const contenidoTarea = ModelContenido({
          Tipo: "tarea",
          Titulo: Nombre,
          Descripcion: descripcion,
          Documento: urlImg,
          idTarea: materiaGuardada._id,
        });
        const contenidoGuardado = await contenidoTarea.save();
        materias.Contenidos = materias.Contenidos.concat(contenidoGuardado._id);
        await materias.save();
        return res.status(200).send({
          msg: "Tarea Subida Correctamente",
          materias,
          materiaGuardada,
        });
      }
    } else {
      return res.send({ msg: "No se ha encontrado esa materia " });
    }
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
module.exports = CrearTareas;
