const mongoose = require("mongoose");
const Class = require("../models/Class");
const Student = require("../models/Student");
const Attendance = require("../models/Attendance");

const getStudents = async (req, res) => {
  try {
    const { classId } = req.params;
    if (!mongoose.isValidObjectId(classId)) {
      return res.status(400).json({ message: "Invalid classId" });
    }

    const status =
      req.query.status === undefined
        ? "enrolled"
        : typeof req.query.status === "string"
          ? req.query.status.toLowerCase()
          : "";
    if (!["enrolled", "dropped"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const classData = await Class.findById(classId);
    if (!classData) return res.status(404).json({ message: "Class not found" });

    const ids = classData.enrollments
      .filter((item) => item.status.toLowerCase() === status)
      .map((item) => item.studentId);
    const students = await Student.find({ _id: { $in: ids } });
    const result = students.map((student) => ({
      studentId: student._id,
      studentCode: student.studentCode,
      fullName: student.fullName,
      email: student.email,
    }));
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getSummary = async (req, res) => {
  try {
    const { classId } = req.params;
    if (!mongoose.isValidObjectId(classId)) {
      return res.status(400).json({ message: "Invalid classId" });
    }

    const classData = await Class.findById(classId);
    if (!classData) return res.status(404).json({ message: "Class not found" });

    const ids = classData.enrollments
      .filter((item) => item.status.toLowerCase() === "enrolled")
      .map((item) => item.studentId);
    const students = await Student.find({ _id: { $in: ids } });
    const attendances = await Attendance.find({
      classId,
      studentId: { $in: ids },
    });

    const summary = students.map((student) => {
      const records = attendances.filter(
        (item) => String(item.studentId) === String(student._id),
      );
      const totalSessions = records.length;
      const present = records.filter(
        (item) => item.status === "PRESENT",
      ).length;
      const absent = records.filter((item) => item.status === "ABSENT").length;
      const attendanceRate =
        totalSessions === 0
          ? 0
          : Math.round((present / totalSessions) * 1000) / 10;

      return {
        studentId: student._id,
        studentCode: student.studentCode,
        fullName: student.fullName,
        totalSessions,
        present,
        absent,
        attendanceRate,
        warning: attendanceRate < 80,
      };
    });

    return res.json({ className: classData.className, students: summary });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getStudents, getSummary };
