const express = require("express");
const DeleteRouter = require("./RutasDelete");
const rutasGet = require("./RutasGet");
const RutasPost = require("./RutasPost");
const RouterUpdate = require("./RutasUpdate");
const IndexRutas = express.Router();

IndexRutas.use("/get", rutasGet);
IndexRutas.use("/post", RutasPost);
IndexRutas.use("/delete", DeleteRouter);
IndexRutas.use("/update", RouterUpdate);

module.exports = IndexRutas;
