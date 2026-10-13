const Loan = require("../models/Loan");
const Member = require("../models/Member");
const Book = require("../models/Book");

exports.getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.find()
      .populate("member_id")
      .populate("items.book_id");

    return res.status(200).json(loans);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to retrieve loans",
      error: error.message,
    });
  }
};

exports.getLoanById = async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id)
      .populate("member_id")
      .populate("items.book_id");

    if (!loan) {
      return res.status(404).json({
        message: "Loan not found",
      });
    }

    return res.status(200).json(loan);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to retrieve loan",
      error: error.message,
    });
  }
};

exports.createLoan = async (req, res) => {
  try {
    const { _id, member_id, items, dueDate } = req.body;

    if (
      !_id ||
      typeof _id !== "string" ||
      !_id.trim() ||
      !member_id ||
      typeof member_id !== "string" ||
      !member_id.trim() ||
      !Array.isArray(items) ||
      items.length === 0 ||
      !dueDate
    ) {
      return res.status(400).json({
        message: "_id, member_id, items and dueDate are required",
      });
    }

    // Validate dueDate
    const parsedDueDate = new Date(dueDate);

    if (Number.isNaN(parsedDueDate.getTime())) {
      return res.status(400).json({
        message: "Invalid dueDate",
      });
    }

    const member = await Member.findById(member_id);

    if (!member) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    for (const item of items) {
      if (
        !item.book_id ||
        typeof item.book_id !== "string" ||
        !item.book_id.trim() ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1
      ) {
        return res.status(400).json({
          message: "Each item must have a valid book_id and quantity >= 1",
        });
      }

      const book = await Book.findById(item.book_id);

      if (!book) {
        return res.status(404).json({
          message: `Book not found: ${item.book_id}`,
        });
      }
    }

    const loan = new Loan({
      _id: _id.trim(),
      member_id: member_id.trim(),
      items: items.map((item) => ({
        book_id: item.book_id.trim(),
        quantity: item.quantity,
      })),
      dueDate: parsedDueDate,
    });

    await loan.save();

    const populatedLoan = await Loan.findById(loan._id)
      .populate("member_id")
      .populate("items.book_id");

    return res.status(201).json(populatedLoan);
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "CastError") {
      return res.status(400).json({
        message: error.message,
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        message: "Loan ID already exists",
      });
    }

    return res.status(500).json({
      message: "Failed to create loan",
      error: error.message,
    });
  }
};

exports.getLoansByMemberId = async (req, res) => {
  try {
    const { member, memberId } = req.params;
    if (member.toLowerCase() !== "member") {
      return res.status(400).json({
        message: "Invalid member route",
      });
    }

    if (!memberId || !memberId.trim()) {
      return res.status(400).json({
        message: "Member ID is required",
      });
    }

    const existingMember = await Member.findById(memberId);

    if (!existingMember) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    const loans = await Loan.find({
      member_id: memberId,
    })
      .populate("member_id")
      .populate("items.book_id");

    return res.status(200).json(loans);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to retrieve member loans",
      error: error.message,
    });
  }
};
