const modelUser = require("../Schemas/SchemaEstudent");

async function GetUser(req, res) {
  const modelUsers = await modelUser.find({});
  res.send({ modelUsers });
}
module.exports = GetUser;
