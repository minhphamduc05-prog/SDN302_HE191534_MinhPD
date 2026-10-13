
const Member = require("../models/Member");

exports.getAllMembers = async (req, res) => {
  try {
    const members = await Member.find();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMemberById = async (req, res) => {
  try {
    const member = await Member.collection.findOne({
      _id: req.params.id,
    });

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createMember = async (req, res) => {
  try {
    const newMember = new Member(req.body);
    const savedMember = await newMember.save();
    res.status(201).json(savedMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateMember = async (req, res) => {
  try {
    const updatedMember = await Member.collection.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { returnDocument: "after" }
    );

    if (!updatedMember) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.status(200).json(updatedMember);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteMember = async (req, res) => {
  try {
    const deletedMember = await Member.collection.findOneAndDelete({
      _id: req.params.id,
    });

    if (!deletedMember) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.status(200).json({
      message: "Member deleted successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
