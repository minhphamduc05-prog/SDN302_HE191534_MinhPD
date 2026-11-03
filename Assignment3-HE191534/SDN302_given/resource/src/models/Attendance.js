const mongoose = require('mongoose');
const attendanceSchema= new mogoose.Schema({
    studentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Student",
        require: true,
    },
    classId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
        require: true
    },
    date:{
        type:Date,
        default: Date.now()
    },
    status:{
        type: "String",
        enum:["PRESEN","ABSENT"],
        require: true
    }
})

module.exports=mongoose.model("Attendance",attendanceSchema);