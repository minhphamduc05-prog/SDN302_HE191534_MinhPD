const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  credit: { type: Number, required: true },
});
module.exports = mongoose.model("Subject", subjectSchema);
