const { validationResult } = require("express-validator");
const EmailValidate = (req, res, next) => {
  try {
    const resultado = validationResult(req);
    console.log(resultado);
    if (resultado.isEmpty()) {
      return next();
    }
    //new Error(resultado);
    return res.status(401).send(resultado.errors);
  } catch (error) {}
};
module.exports = EmailValidate;
