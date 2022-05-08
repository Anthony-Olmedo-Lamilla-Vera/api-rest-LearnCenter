const Mongodb = require("mongoose");

const userAccount = new Mongodb.Schema({
  Nombre: String,
  Email: { type: String, unique: true },
  Contraseña: String,
  Semestre: String,
  Categoria: String,
  Carrera: {
    type: Mongodb.Schema.Types.ObjectId,
    ref: "carreras",
  },
  Materias: [
    {
      type: Mongodb.Schema.Types.ObjectId,
      ref: "materias",
    },
  ],
});
const modelUser = Mongodb.model("users", userAccount);
module.exports = modelUser;
