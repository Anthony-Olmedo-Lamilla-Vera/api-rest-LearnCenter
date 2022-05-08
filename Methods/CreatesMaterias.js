const modeloCarrera = require("../Schemas/ModeloCarrera");
const ModeloSemestre = require("../Schemas/ModeloSemestre");
const ModelMateria = require("../Schemas/SchemaMateria");
const AlgoritmosMaterias = require("./AlgoritmoMaterias");

const CreatesMaterias = async (req, res, next) => {
  console.log("---- Creando materias año Lectivo --- 2022");

  AlgoritmosMaterias().forEach((itemmateria) => {
    itemmateria.semestre.forEach(async (item) => {
      item.materias.forEach(async (mat) => {
        const itemMateria = ModelMateria({
          Carrera: itemmateria.carrera,
          Nombre: mat.Nombre,
          Nivel: item.semestre,
          Curso: ` ${mat.Nombre.slice(0, 3)} - ${item.semestre} `,
        });
        await itemMateria.save();
      });
    });
  });

  next();
};
module.exports = CreatesMaterias;
