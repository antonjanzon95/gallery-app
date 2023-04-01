var express = require("express");
var router = express.Router();
const multer = require("multer");
const fs = require("fs");
const mysql = require("mysql2");
const path = require("path");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
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

      fs.unlink(req.file.path, (error) => {
        if (error) {
          console.log("error: ", error);
        }
      });

      res.send("file uploaded successfully");
    });
  } catch (error) {
    console.log("error: ", error);
  }
});

router.post("/delete", (req, res) => {
  try {
    const imageId = req.body.id;

    const sql = `DELETE FROM imagestable WHERE id=${imageId}`;

    connection.query(sql, (error, result) => {
      if (error) {
        console.log("error deleting image ", error);
      }

      res.json("image deleted successfully");
    });
  } catch (error) {
    console.log("error deleting image ", error);
  }
});

module.exports = router;
