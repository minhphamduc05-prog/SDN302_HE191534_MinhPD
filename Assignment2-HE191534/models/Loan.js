const mongoose = require("mongoose");

const loanItemSchema = new mongoose.Schema(
  {
    book_id: { type: String, ref: "Book", required: true },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be at least 1"],
    },
  },
  { _id: false },
);

const loanSchema = new mongoose.Schema(
 {
    member_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
        required: true
    },

    items: [{
        book_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
            required: true
        },

        quantity: {type: Number, min: 1, required: true}
    }],

    borrowDate: {type: Date, default: Date.now},

    dueDate: {type: Date, required: true},

    returnDate: {type: Date, default: null},

    status: {
        type: String,
        enum: ["Borrowing", "Returned", "Overdue"],
        default: "Borrowing"
    },

}, {timestamps: true}
);

module.exports = mongoose.model("Loan", loanSchema);
