const CalificarTareas = require("../MethodsTareas/CalificarTareas");
const VerifyProfesor = require("../MethodsTareas/VerifyProfesor");
const RouterUpdate = require("express").Router();

RouterUpdate.put("/calificar/:idEntrega", VerifyProfesor, CalificarTareas);
module.exports = RouterUpdate;
