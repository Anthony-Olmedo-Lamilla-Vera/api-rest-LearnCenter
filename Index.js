const express = require("express");
const IndexRutas = require("./Routes/Index");
const app = express();
const Mongodb = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const uri =
  "mongodb+srv://antocraxx:perfect12@cluster0.feg8c.mongodb.net/Estudiantes?retryWrites=true&w=majority";
Mongodb.connect(uri).then((msg) => console.log("Conectado a Base de Datos"));
/*Middlewars  */
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

cloudinary.config({
  cloud_name: "dvrsowzhf",
  api_key: "619715953128421",
  api_secret: "4BZId0FMtM7OSHubU5XI0qRXzqU",
  secure: true,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Files/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
app.use(
  "/api/v1",
  (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  },
  IndexRutas
);
app.post("/api/prueba", upload.single("img"), (req, res) => {
  try {
    const { msg } = req.body;

    console.log(msg);
    console.log(req.file);
    res.send(req.body);
  } catch (error) {
    console.log(error);
  }
});

app.listen(process.env.PORT || 4000, () => {
  console.log("En el puerto 6000");
});
