const router = require('express').Router();
const verifyToken = require('../middlewares/verifyToken');
const { getStudents, getSummary } = require('../controllers/classController');

router.get('/:classId/students', verifyToken, getStudents);
router.get('/:classId/attendance-summary', verifyToken, getSummary);
module.exports = router;
