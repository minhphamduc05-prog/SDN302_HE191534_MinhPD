const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema(
  {
    studentCode: String,
    fullName: String,
    email: String,
  },
);
module.exports = mongoose.model("Student", studentSchema);
