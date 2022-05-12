var express = require("express");
var app = express();
var mongoose = require("mongoose");
var port = 3001;
var Student = require("./model");
var bodyParser = require("body-parser");
var url = "mongodb://localhost:27017/studentDb";

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

mongoose
  .connect(url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

// creating server
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/addStudent", (req, res) => {
  console.log(req.body);
  var mydata = new Student(req.body);
  mydata
    .save()
    .then(() => {
      res.send("Successfully data entered");
    })
    .catch((err) => {
      throw err;
      console.log("Could not connect to the database. Exiting now...", err);
      process.exit();
    });
});

app.get("/getStudents", async (req, res) => {
  var count = await Student.find().count();
  console.log(count);
  Student.find(req.query)
    .then((student) => {
      res.render("table", { student: student, count });
    })
    .catch((err) => {
      throw err;
    });
});

app.post("/deleteStudents/:id", (req, res) => {
  Student.findByIdAndDelete(req.params.id).then((student) => {
    console.log("Deleted successfully!");
    res.redirect("/getStudents");
  });
});

app.get("/findStudents", (req, res) => {
  Student.find({ DSBDA_marks: { $gt: 20 } })
    .then((student) => {
      res.render("table", { student: student });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/updateMarks/:id", (req, res) => {
  Student.findByIdAndUpdate(req.params.id, {
    $inc: { DSBDA_marks: 10 },
  })
    .then((student) => {
      console.log("Updated successfully!");
      res.redirect("/getStudents");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/findStudentsgt25", (req, res) => {
  Student.find({
    DSBDA_marks: { $gt: 25 },
    CNS_marks: { $gt: 25 },
    CC_marks: { $gt: 25 },
    AI_marks: { $gt: 25 },
    WAD_marks: { $gt: 25 },
  })
    .then((student) => {
      res.render("table", { student: student });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(port, () => {
  console.log("Server listening on port 3000");
});
