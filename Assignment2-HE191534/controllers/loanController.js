
const Loan = require("../models/Loan");

exports.getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.collection.find().toArray();
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getLoanById = async (req, res) => {
  try {
    const loan = await Loan.collection.findOne({
      _id: req.params.id
    });

    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    res.status(200).json(loan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createLoan = async (req, res) => {
  try {
    const loanData = {
      ...req.body,
      _id: String(req.body._id)
    };

    await Loan.collection.insertOne(loanData);

    res.status(201).json(loanData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getLoansByMemberId = async (req, res) => {
  try {
    const loans = await Loan.collection
      .find({ member_id: req.params.memberId })
      .toArray();

    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
