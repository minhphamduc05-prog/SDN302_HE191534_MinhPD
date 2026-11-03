const Class=require("../models/Class");


const getStudentsByClassIdAndStatusEnrolled = async (req, res) => {
    try {
        const classId=req.params.classId;
        const classData=await Class.findById(classId).populate({
            path: "students",
            match: { status: "enrolled" }
        });
        res.json(classData.students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getStudentsByClassIdAndStatusEnrolled };
