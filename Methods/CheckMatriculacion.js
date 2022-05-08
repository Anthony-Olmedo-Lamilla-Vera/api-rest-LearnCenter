const { verify } = require("jsonwebtoken");
const modeloCarrera = require("../Schemas/ModeloCarrera");

async function CheckMatriculacion(req, res, next) {
  const token = req.headers.authorization.slice(7);
  const clavePrivada = process.env.privateKeyToken;

  const tokenResp = verify(token, clavePrivada);
  const duplicate = [];

  const modelCarrera = await modeloCarrera.find({});
  modelCarrera.forEach((itemateria) => {
    const findItem = itemateria.Estudiantes.find(
      (item) => item.toJSON() === tokenResp.id
    );
    if (findItem !== undefined) {
      duplicate.push(findItem);
    }
  });
  if (duplicate.length <= 0) {
    return res
      .status(403)
      .send({ msg: "No se encuentra matriculado en ninguna Carrera" });
  }
  next();
}
module.exports = CheckMatriculacion;
