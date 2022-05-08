const createUser = require("../Methods/CreateUser");
const EmailValidate = require("../middleware/EmailValidate");
const { check } = require("express-validator");
const VerifyIdUser = require("../middleware/VerifyIdUser");
const ComprobarToken = require("../middleware/ComprobarToken");
const MateriaDuplicadaUser = require("../middleware/MateriaDuplicadaUser");
const Login = require("../Methods/Login");
const Inscripcion = require("../Methods/Inscripcion");
const CreatesMaterias = require("../Methods/CreatesMaterias");
const createSemestres = require("../Methods/CreateSemestres");
const CreateCarrera = require("../Methods/CreateCarrera");
const JoinMaterias = require("../Methods/JoinMaterias");
const MatriculaCarrera = require("../Methods/MatriculaCarrera");
const checkMatriculaEstudiante = require("../Methods/checkMatriculaEstudiante");
const CheckMatriculacion = require("../Methods/CheckMatriculacion");
const CrearTareas = require("../MethodsTareas/CrearTarea");
const VerifyProfesor = require("../MethodsTareas/VerifyProfesor");
const MateriaProfesor = require("../MethodsTareas/MateriasProfesor");
const EntregaTarea = require("../MethodsTareas/EntregaTarea");
const EditTare = require("../MethodsTareas/EditTarea");
const GetUserToken = require("../MethodsGet/GetUserToken");
const EntregaDuplicada = require("../middleware/EntregaDuplicada");
const CreateContent = require("../MethodsContenido/CreateContent");
const upload = require("../middleware/FilesMid");
const RutasPost = require("express").Router();
const validaciones = [
  check("email")
    .isEmail()
    .withMessage("Formato de Correo Incorrecto")
    .normalizeEmail()
    .exists()
    .notEmpty(),
  check("contraseña")
    .isLength({ min: 5 })
    .withMessage("Debe tener minimo 8 caracteres ")
    .exists(),
  check("nombre")
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage("Ingrese un nombre de usuario"),
  check("categoria")
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("elija una categoria"),
  check("carrera")
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage("elija una Carrea"),
];
RutasPost.post("/userToken", GetUserToken);

RutasPost.post("/create-user", validaciones, EmailValidate, createUser);
RutasPost.post("/login-user", Login);
RutasPost.post(
  "/Inscripcion-Materias",
  ComprobarToken,
  VerifyIdUser,
  CheckMatriculacion,
  MateriaDuplicadaUser,
  Inscripcion
);

RutasPost.post(
  "/matricula-carrera",
  ComprobarToken,
  checkMatriculaEstudiante,
  MatriculaCarrera
);
/*Rutas Tareas */
RutasPost.post(
  "/materias-profesor",
  ComprobarToken,
  VerifyProfesor,
  MateriaProfesor
);

RutasPost.post(
  "/create-Tarea",
  upload.single("file"),
  ComprobarToken,
  VerifyProfesor,
  CrearTareas
);
RutasPost.post("/edit-tarea", VerifyProfesor, EditTare);
RutasPost.post(
  "/entrega-tarea",
  upload.single("file"),

  ComprobarToken,
  EntregaDuplicada,
  EntregaTarea
);
/*COntenidos  */

RutasPost.post("/create-content", VerifyProfesor, CreateContent);
RutasPost.post("/delete-content");
RutasPost.post("/edit-content");

/*Rutas ADMIN */
RutasPost.post("/create-Carrera", CreateCarrera);
RutasPost.post("/create-Semestres", createSemestres);
RutasPost.post("/create-Materias", CreatesMaterias, JoinMaterias);

module.exports = RutasPost;
