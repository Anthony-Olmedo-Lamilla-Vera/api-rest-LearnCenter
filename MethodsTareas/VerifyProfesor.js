const jwt = require("jsonwebtoken");
const modelUser = require("../Schemas/SchemaEstudent");
async function VerifyProfesor(req, res, next) {
  const token = req.headers.authorization.slice(7);

  try {
    const userjwt = jwt.verify(token, process.env.privateKeyToken);
    const users = await modelUser.findById(userjwt.id);

    if (users.Categoria === "Profesor") {
      return next();
    }

    res.status(403).send({ msg: "No eres un docente " });
  } catch (error) {
    console.log(error);
    res.status(400).send({ err: error, msg: "Token invalido" });
  }
}
module.exports = VerifyProfesor;
