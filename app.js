const express = require("express");
const app = express();
const cors = require("cors");
const compression = require("compression");
const zlib = require("node:zlib");
const config = require("./config");
const path = require("path");
const fs = require("fs");
var mysql = require('mysql');
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(compression({ level: 9, strategy: zlib.constants.Z_RLE }));
const http = require("http");
// const https = require('https');
const net = require("net");
const Url = require("url");

const port = 7979;
const server = http.createServer(app).listen(port, function () {
  console.log(`server start at port ${port}`);
});

app.get("/", express.static(path.join(__dirname, "./public")));

// app.get("/pub2/info",  (req, res) => {
//     console.log("REQUEST HAS BEEN SENT ! ->", req?.originalUrl);


//   var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "test2"
//   });
  
//   con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = "SELECT * FROM `info`"
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       for (let i = 0; i <result.length ;i++){
//         console.log("Result: " + result[i].firstName);
//       }
// con.end()
//     });
//   });
// });


// get
app.get("/pub/info", (req, res) => {
  console.log("REQUEST HAS BEEN SENT ! ->", req?.originalUrl);

  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test2",
  });

  con.connect((err) => {
    if (err) {
      console.error("DB connection error:", err);
      return res.status(500).send("Database connection failed");
    }

    console.log("Connected!");

    const sql = "SELECT * FROM `info`";
    con.query(sql, (err, result) => {
      con.end(); // ensure connection is closed

      if (err) {
        console.error("Query error:", err);
        return res.status(500).send("Query failed");
      }

      // ✅ Send data to client
      res.json(result);
    });
  });
});


//post 
app.post("/pub/search", (req, res) => {
  console.log("REQUEST RECEIVED ->", req.originalUrl);

  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Missing 'name' in request body" });
  }

  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test2",
  });

  con.connect((err) => {
    if (err) {
      console.error("DB connection error:", err);
      return res.status(500).send("Database connection failed");
    }

    console.log(name);

    const sql = "SELECT * FROM info WHERE firstName = ?";
    con.query(sql, [name], (err, result) => {
      con.end();

      if (err) {
        console.error("Query error:", err);
        return res.status(500).send("Query failed");
      }

      res.json(result);
    });
  });
});