var express = require("express");
var router = express.Router();
const multer = require("multer");
const fs = require("fs");
const mysql = require("mysql2");
const path = require("path");

const connection = mysql.createConnection({
  host: "localhost",
  user: "images",
  password: "password",
  database: "images",
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", function (req, res, next) {
  try {
    let sql = "SELECT * FROM imagestable";

    connection.query(sql, (error, result) => {
      if (error) {
        console.log("error: ", error);
      }

      const images = result.map((image) => ({
        id: image.id,
        name: image.name,
        data: image.data.toString("base64"),
        mime_type: image.mime_type,
      }));

      res.send(images);
    });
  } catch (error) {
    console.log("error: ", error);
  }
});

router.post("/savefile", upload.single("image"), (req, res) => {
  try {
    const image = {
      name: req.file.originalname,
      data: fs.readFileSync(req.file.path),
    };

    console.log(image);
    const sql = "INSERT INTO imagestable SET ?";

    connection.query(sql, image, (error, result) => {
      if (error) {
        console.log("error: ", error);
      }

      res.send("file uploaded successfully");
    });
  } catch (error) {
    console.log("error: ", error);
  }
});

module.exports = router;
