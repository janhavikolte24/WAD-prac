var mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({
  Name: String,
  Roll_no: String,
  WAD_marks: {
    type: Number,
    max: 100,
    min: 0,
  },
  CC_marks: {
    type: Number,
    max: 100,
    min: 0,
  },
  CNS_marks: {
    type: Number,
    max: 100,
    min: 0,
  },
  DSBDA_marks: {
    type: Number,
    max: 100,
    min: 0,
  },
  AI_marks: {
    type: Number,
    max: 100,
    min: 0,
  },
});
module.exports = mongoose.model("Student", StudentSchema);
