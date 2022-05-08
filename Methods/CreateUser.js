const { default: mongoose } = require("mongoose");
const modeloCarrera = require("../Schemas/ModeloCarrera");
const { modelName, schema } = require("../Schemas/SchemaEstudent");
const modelUser = require("../Schemas/SchemaEstudent");

const createUser = async (req, res) => {
  const { email, contraseña, nombre, categoria, carrera } = req.body;
  try {
    const User = new modelUser({
      Nombre: nombre,
      Email: email,
      Contraseña: contraseña,
      Categoria: categoria,
      Carrera: new mongoose.Types.ObjectId(carrera),
    });
    await User.save().then(async (x) => {
      const modelCarrera = await modeloCarrera.findOne({
        _id: x.Carrera,
      });
      modelCarrera.Estudiantes = modelCarrera.Estudiantes.concat(x._id);
      await modelCarrera.save();
      return res.status(200).send({ msg: "Usuario Creado", data: x });
    });
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .send([{ error, msg: "Este correo ya se encuentra registrado" }]);
  }
};
module.exports = createUser;
