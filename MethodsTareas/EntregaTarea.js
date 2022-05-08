const { verify } = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const modelEntregasTarea = require("../Schemas/ModelEntrega");
const ModelTarea = require("../Schemas/ModelTareas");
const cloudinary = require("cloudinary").v2;

async function EntregaTarea(req, res) {
  const { idtarea } = req.body;
  const token = req.headers.authorization.slice(7);
  const verifyToken = verify(token, process.env.privateKeyToken);
  const Tarea = await ModelTarea.findById(idtarea);

  try {
    let urlImg;
    await cloudinary.uploader
      .upload(req.file.path)
      .then((res) => (urlImg = res.url));

    if (Tarea !== null) {
      const Entrega = modelEntregasTarea({
        FechaEntrega: new Date().getTime(),
        Estudiante: new mongoose.Types.ObjectId(verifyToken.id),
        Nota: "sin revisar",
        URLEntrega: urlImg,
        EstadoEntrega: "pendiente de revision ",
        Tarea: new mongoose.Types.ObjectId(Tarea._id),
      });

      const EntregaGuardad = await Entrega.save();
      Tarea.Entregas = Tarea.Entregas.concat(EntregaGuardad._id);
      await Tarea.save();

      return res
        .status(200)
        .send({ msg: "Entrega completada", Tarea, EntregaGuardad });
    }
    return res.status(400).send({ msg: "eRRR", data: Tarea });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
}
module.exports = EntregaTarea;
