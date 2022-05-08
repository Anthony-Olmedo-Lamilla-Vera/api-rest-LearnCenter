const jwt = require("jsonwebtoken");

const ComprobarToken = async (req, res, next) => {
  const clavePrivada = process.env.privateKeyToken;
  const token = req.headers.authorization.slice(7);
  try {
    jwt.verify(token, clavePrivada);
    next();
  } catch (error) {
    return res.status(403).send({
      err: "errrr",
      msg: error,
      msg2: "Token Invalido",
    });
  }
};
module.exports = ComprobarToken;
