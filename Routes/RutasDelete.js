const DeleteContenido = require("../MethodsContenido/DeleteContenido");
const VerifyProfesor = require("../MethodsTareas/VerifyProfesor");

const DeleteRouter = require("express").Router();
DeleteRouter.delete(
  "/delete-content/:idcontent",

  DeleteContenido
);

module.exports = DeleteRouter;
