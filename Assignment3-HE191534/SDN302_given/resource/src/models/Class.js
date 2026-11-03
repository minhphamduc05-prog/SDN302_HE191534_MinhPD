const mongoose = require("mongoose");
const classSchema = new mongoose.Schema({
  className: { type: String, required: true },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  lecturerName: { type: String, required: true },
  status: { type: String, enum: ["OPEN", "CLOSED"], default: "active" },
  enrollments: [
    {
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
      },
      status: { type: String, enum: ["enrolled", "dropped"], require: true },
    },
  ],
});
module.exports = mongoose.model("Class", classSchema);
