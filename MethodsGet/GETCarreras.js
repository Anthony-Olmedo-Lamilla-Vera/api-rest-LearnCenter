const modeloCarrera = require("../Schemas/ModeloCarrera");

async function GETCarreras(req, res) {
  const modeloCarreras = await modeloCarrera
    .find({})
    .populate("ContenidoCarrera");
  res.send({ modeloCarreras });
}
module.exports = GETCarreras;
