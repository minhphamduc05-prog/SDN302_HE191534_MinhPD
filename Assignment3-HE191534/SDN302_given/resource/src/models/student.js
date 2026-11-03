const mogoose = require("mongoose");
const studentSchema = new mogoose.Schema({
  studentCode: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
});
module.exports = mogoose.model("Student", studentSchema);
