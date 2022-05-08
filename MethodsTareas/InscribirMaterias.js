function InscribirMaterias(req, res) {
  const { materias } = req.body;

  console.log(materias);

  res.send(materias);
}
module.exports = InscribirMaterias;
