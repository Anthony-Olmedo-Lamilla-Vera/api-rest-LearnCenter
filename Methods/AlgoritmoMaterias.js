function AlgoritmosMaterias() {
  const materias = [
    {
      carrera: "Informatica",
      numeroSemestres: 10,
      semestre: [
        {
          semestre: 1,
          materias: [
            {
              Nombre: "Calculo Diferencial",
            },
            {
              Nombre: "Programacion",
            },
            {
              Nombre: "Fundamentos Diferencial",
            },
          ],
        },
      ],
    },
    {
      carrera: "Medicina",
      numeroSemestres: 12,
      semestre: [
        {
          semestre: 1,
          materias: [
            {
              Nombre: "Anatomia",
            },
            {
              Nombre: "TRAQUEOTOMIA",
            },
          ],
        },
      ],
    },
    {
      carrera: "Contabilidad",
      numeroSemestres: 8,
      semestre: [
        {
          semestre: 1,
          materias: [
            {
              Nombre: "Administracion de Empresas",
            },
            {
              Nombre: "Analisis de Costos",
            },
            {
              Nombre: "Lavado Dinero",
            },
          ],
        },
      ],
    },
    {
      carrera: "Industrial",
      numeroSemestres: 8,
      semestre: [
        {
          semestre: 1,
          materias: [
            {
              Nombre: "Arquitectura",
            },
            {
              Nombre: "Investigacion de Campo",
            },
            {
              Nombre: "Ingenieria de materiales",
            },
          ],
        },
      ],
    },
  ];

  return materias;
}
module.exports = AlgoritmosMaterias;
