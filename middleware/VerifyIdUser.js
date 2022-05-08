const modelUser = require("../Schemas/SchemaEstudent");
const jwt = require("jsonwebtoken");
const VerifyIdUser = async (req, res, next) => {
  const token = req.headers.authorization.slice(7);
  const clavePrivada = process.env.privateKeyToken;
  const tokenResp = jwt.verify(token, clavePrivada);
  try {
    await modelUser
      .findById(tokenResp.id)
      .then((x) => {
        if (x !== null) {
          return next();
        }
        return res.send("No existe este usuario");
      })
      .catch((er) => {
        return res.send("No existe este usuario");
      });
  } catch (error) {
    res.status(400).send(error);
  }
};
module.exports = VerifyIdUser;
