const { verify } = require("jsonwebtoken");

const GetUserToken = (req, res) => {
  const { token } = req.body;
  try {
    verify(token, process.env.privateKeyToken);

    res.status(200).send({ msg: "Token Valido" });
  } catch (error) {
    res.status(401).send({ msg: "Token Invalido" });
  }
};

module.exports = GetUserToken;
