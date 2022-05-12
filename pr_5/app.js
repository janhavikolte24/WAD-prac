const express = require("express");
var app = express();
var bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
var port = 3000;
const path = require("path");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.post("/pushdata", (req, res) => {
  console.log(req.body);
  res.send("Data stored successfully !");
});

app.get("/displayData", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log("Server running on port 3000");
});
