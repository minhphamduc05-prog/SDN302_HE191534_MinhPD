const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => new mongoose.Types.ObjectId().toString(),
    },

    title: { type: String, required: true },

    author: { type: String, required: true },

    category: { type: String, required: true },

    isbn: { type: String, required: true, unique: true },

    publishedYear: { type: Number },

    totalCopies: { type: Number, min: 0 },

    availableCopies: { type: Number, min: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Book", bookSchema);
