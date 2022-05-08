require("dotenv").config();
const jwt = require("jsonwebtoken");
const modelUser = require("../Schemas/SchemaEstudent");
const clavePrivada = process.env.privateKeyToken;
const Login = async (req, res, next) => {
  const { email, contraseña } = req.body;

  console.log(email);
  if (email === "" || contraseña === "") {
    res.status(401).send([{ msg: "Llene los campos correspondientes" }]);
  }
  try {
    await modelUser
      .findOne({ Email: email.toLowerCase() })
      .then((Respuesta) => {
        if (Respuesta !== null) {
          if (Respuesta.Contraseña === contraseña) {
            const jwtDatos = {
              id: Respuesta._id,
              Nombre: Respuesta.Nombre,
              Email: Respuesta.Email,
            };
            const tokenUser = jwt.sign(jwtDatos, clavePrivada, {
              expiresIn: "1h",
            });

            return res.status(200).send({
              tokenUser: tokenUser,
            });
          }
          return res.status(403).send([{ msg: "Contraseña Incorrecta" }]);
        }
        return res.status(403).send([{ msg: "email no existe" }]);
      });
  } catch (error) {
    console.log(error);
    res.status(401).send([{ msg: "Llene los campos correspondientes" }]);
  }
};
module.exports = Login;
