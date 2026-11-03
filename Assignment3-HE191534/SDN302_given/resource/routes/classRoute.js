const express=require("express");
const classController=require("../src/controllers/classController");
const route=express.Router();
const verifyToken = require('../middlewares/authMiddleware');

route.get("/classes/:classId/students", verifyToken, classController.getStudentsByClassId);
route.get("/classes/:classId/attendance-summary", verifyToken, async (req, res) => {
    res.status(200).json({ message: "Attendance summary for class " + req.params.classId });
});
route.get("/classes/:classId/students?status=enrolled", verifyToken, classController.getStudentsByClassIdAndStatusEnrolled);
